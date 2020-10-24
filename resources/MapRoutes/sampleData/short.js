// for file short.csv
// 2 drivers
// this is the response coming from speedyroute.com endpoint

// this is the request body i used..
const requestBody = {
  depot: {
    lat: 26.3976391,
    lon: -80.1067828,
    name: '850 Broken Sound Parkway Northwest, Boca Raton, FL, USA'
  },
  locations: [
    {
      name: '1000 S Ocean Blvd Boca Raton, FL, 33432',
      lon: -80.07121579999999,
      lat: 26.3369831
    },
    {
      name: '10217 Sleepy Way Brk Boca Raton, FL, 33428',
      lon: -80.2061394,
      lat: 26.3386633
    },
    {
      name: '4851 Sugar Pine Dr Boca Raton, FL, 33487',
      lon: -80.1194131,
      lat: 26.4149651
    },
    {
      name: '1050 NW 15th Ave Boca Raton, FL, 33486',
      lon: -80.11565499999999,
      lat: 26.359936
    },
    {
      name: '4157 Cedar Creek Rd Boca Raton, FL, 33487',
      lon: -80.1070227,
      lat: 26.4129184
    }
  ],
  hasFinish: false,
  loop: true,
  override: false,
  realTime: false,
  reloadable: true,
  reversible: false,
  showPlaces: false,
  startHour: 8,
  startTime: 0,
  timeboxing: false,
  uploadAvailable: true,
  vehicles: '2'
};

const responseData = {
  status: 'OK',
  route: [ [ 0, 1, 2 ], [ 0, 4, 3, 5 ] ],
  miles: '16.8',
  minutes: 44,
  directions: [
    {
      address: '1000 S Ocean Blvd Boca Raton, FL, 33432',
      distance: 10715.993,
      duration: 1177738,
      directions: [Array]
    },
    {
      address: '10217 Sleepy Way Brk Boca Raton, FL, 33428',
      distance: 53559.324,
      duration: 4464475,
      directions: [Array]
    },
    {
      address: '10217 Sleepy Way Brk Boca Raton, FL, 33428',
      distance: 53559.324,
      duration: 4464475,
      directions: [Array]
    },
    {
      address: '10217 Sleepy Way Brk Boca Raton, FL, 33428',
      distance: 53559.324,
      duration: 4464475,
      directions: [Array]
    },
    {
      address: '10217 Sleepy Way Brk Boca Raton, FL, 33428',
      distance: 53559.324,
      duration: 4464475,
      directions: [Array]
    },
    {
      address: '10217 Sleepy Way Brk Boca Raton, FL, 33428',
      distance: 53559.324,
      duration: 4464475,
      directions: [Array]
    }
  ],
  polylines: [
    [
      'qyb`Dlz|gNC{NI]IMi@e@Ro@Hw@?wCAShYEGeHGyAMuAa@sDKmAMeCMqEAiSQ}_@CsO?wDFgH?kOQqECkBCaG?iGxC?ne@MnH@dDAdDGh|@SvC?lADxETrBRdC\\~AVjFjA`D`AlCbAC]hPMlz@EjCKxCGzUGA_BDu@KmE?_BDmB@_BGOG_WpIPlD^~MfCxEn@dF\\pL`@EbBDJJHVB|CBTORWREhA_@LQHc@JQTDh@KjAAPFPRPLPFlBBBgA',
      'mbw_D|~ugNCfAmBCQGQMQSQGkA@i@JUEKPIb@MPiA^SDSVUN}CCWCKIEKDcBqLa@eF]yEo@_NgCmD_@qIQF~VGRA~AGlB?|ALlEHr@@~ADdXEp@FtVCbCHVFvSI`@Hx\\EzC?nBTdp@AxEKpDw@~HQrDAhj@BnTC~PHpCFvEBfvAT`s@TnXPxWBzLBd`ALfb@NjCXzBpAfHLtAHpBDlbAD~LAfcAAbAe@nFGbDBpF`POho@QDxOtBA',
      '????'
    ],
    [
      'qyb`Dlz|gNC{NI]IMi@e@Ro@Hw@?wCAShYEGeHGyAMuAa@sDQmCUwGAcDPgAN]LQb@YRETCT@RDRFd@XhFjGh@v@|@bBb@`AbC~FdDjGtBfEz@rAdCpDhAxAhp@`u@`FjFvDbDrCtB|@j@bDlBdD~AdAb@jErBlGbCxAr@rA`AlCdCtElF~Ab@n@HvBBVAPCRSN_@@kDNgF^aFj@cEl@gD~DhAl@Jl@@r@G~DHjDCx@@`Hl@lC`@~Dd@fCB',
      'ql{_Dls~gNgCC_Ee@mCa@aHm@y@AkDB_EImAUsAQeD_Ae@KYpAk@nDk@fAc@^YJoFlAmATyBLoA?aAC{BW{Bg@uAMoDgAgFiBuAq@}CcBsCgBaAq@eDkC}DyDaCgCgXwZoVaYyAkB}BmD}BaEcBsDi@wA]iBaCkHyA}FqAcE]{@eBmDmCgFu@mA[c@UQWK[Ig@CY?WHOLMR@pPBjKJ`DHvA`ArLDlA@`D?lKBbG?vOExIC~XGdR?pIGlPo}@^iWP}DJ_QLeTFE_LhB?Am@',
      'gcf`Dji_hN@l@iB?CmQhB[@oBB}@LoB^}CHiAHsB@u@CmBGy@Q}AMw@fAWdBAlBBv@DrAPCiYCUMg@]g@',
      '????'
    ]
  ],
  copyrights: '',
  vehicles: [ { miles: 16.8, minutes: 44 }, { miles: 11.9, minutes: 31 } ]
}

module.exports = {
  requestBody,
  responseData
}
