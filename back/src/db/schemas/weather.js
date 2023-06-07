const { Schema, model } = require('mongoose');

const WeatherSchema = new Schema(
  {
    addressName: {
      type: String,
      required: true,
    },
    areaNo: {
      type: Number,
    },
    UltraSrtNcst: {
      /*
        T1H	기온	℃
        RN1	1시간 강수량	mm
        REH	습도	%
        PTY	강수형태	코드값 (초단기) 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
        VEC	풍향	deg
        WSD	풍속	m/s
      */
      baseDate: Number,
      baseTime: Number,
      T1H: Number,
      RN1: Number,
      REH: Number,
      PTY: Number,
      VEC: Number,
      WSD: Number,
    },
    UltraSrtFcst: {
      /*
        T1H	기온	℃
        RN1	1시간 강수량 mm
        SKY	하늘상태 코드값 맑음(1), 구름많음(3), 흐림(4)
        REH	습도	%
        PTY	강수형태	코드값 (초단기) 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
        VEC	풍향	deg
        WSD	풍속	m/s
      */
      baseDate: Number,
      baseTime: Number,
      h1: { T1H: Number, RN1: Number, SKY: Number, REH: Number, PTY: Number, VEC: Number, WSD: Number },
      h2: { T1H: Number, RN1: Number, SKY: Number, REH: Number, PTY: Number, VEC: Number, WSD: Number },
      h3: { T1H: Number, RN1: Number, SKY: Number, REH: Number, PTY: Number, VEC: Number, WSD: Number },
      h4: { T1H: Number, RN1: Number, SKY: Number, REH: Number, PTY: Number, VEC: Number, WSD: Number },
      h5: { T1H: Number, RN1: Number, SKY: Number, REH: Number, PTY: Number, VEC: Number, WSD: Number },
      h6: { T1H: Number, RN1: Number, SKY: Number, REH: Number, PTY: Number, VEC: Number, WSD: Number },
      h7: { T1H: Number, RN1: Number, SKY: Number, REH: Number, PTY: Number, VEC: Number, WSD: Number },
    },
    UVIdx: {
      date: Number,
      h0: Number,
      h3: Number,
      h6: Number,
      h9: Number,
      h12: Number,
    },
  },
  {
    timestamps: true,
  },
);

const WeatherModel = model('Weather', WeatherSchema);
module.exports = WeatherModel;
