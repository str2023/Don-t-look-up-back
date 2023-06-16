const { Activity } = require('../db');

const createActivity = async ({ temp, wx, area, activity, userId }) => {
  // 새 액티비티 객체 생성
  const newActivity = {
    temp: [temp],
    wx,
    activity: [
      {
        name: activity,
        location: [
          {
            addressName: area,
            user: [{ userId }],
          },
        ],
      },
    ],
  };

  // DB에 액티비티.날씨가 존재하는지 확인
  const updateActivity = newActivity.activity[0];
  const isExist = await Activity.findAllByAddressName({ temp, wx, area });
  if (isExist.activitiesInArea) {
    const { _id } = isExist.activitiesInArea;
    const a = isExist.activitiesInArea?.activity.find((e) => e.name === activity);

    // 액티비티가 없다면 추가
    if (!a) {
      const addedActivity = await Activity.addActivity({ _id, updateActivity });
      return addedActivity;
    }

    const b = a.location.find((e) => e.addressName === area);

    // 추천한 적이 없다면 추천
    if (!b.user.find((e) => e.userId === userId)) {
      const recommendedActivity = await Activity.recommendActivity({ _id, updateActivity });
      return recommendedActivity;
    }

    const errorMessage = '이미 추천하였습니다.';
    return { errorMessage };
  }

  // 장소만 없다면 장소 추가 후 액티비티.날씨 생성
  if (isExist.allActivities) {
    const { _id } = isExist.allActivities;
    const addedLocation = await Activity.addLocation({ _id, updateActivity });
    return addedLocation;
  }

  const created = await Activity.create({ newActivity });
  return created;
};

const getActivity = async ({ temp, wx, area }) => {
  const { allActivities, activitiesInArea } = await Activity.findAllByAddressName({ temp, wx, area });

  if (!allActivities) {
    const errorMessage = '액티비티가 없습니다.';
    return { errorMessage };
  }

  const convertObj = {};
  const tryActivities = [];
  // 동네의 액티비티
  if (activitiesInArea) {
    activitiesInArea.activity.forEach((obj) => {
      convertObj[obj.name] = obj.location.find((e) => e.addressName === area)?.count;
    });
  }
  // 전체 액티비티
  allActivities.activity.forEach((obj) => {
    tryActivities.push(obj.name);
  });

  let activities = [];
  if (convertObj.lenth !== 0) {
    activities = Object.entries(convertObj)
      .sort(([, a], [, b]) => b - a) // count(추천수) 기준 내림차 정렬
      .map((e) => e[0]); // activity로만 배열 생성
  }
  return { activities, tryActivities };
};

module.exports = { createActivity, getActivity };
