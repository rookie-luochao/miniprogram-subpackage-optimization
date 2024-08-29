'use strict';
exports.VirtualBackgroundMobileConfig = {
  calling: [
    [
      {
        name: 'switchCamera',
        customStyle: { justifyContent: 'flex-start' },
        props: {},
      },
      { name: 'virtualBackground' },
      {
        name: 'camera',
        customStyle: { justifyContent: 'flex-end' },
        props: {},
      },
    ],
    [{}, { name: 'hangup', customStyle: { paddingTop: '6vh' } }, {}],
  ],
  accept: [
    [
      {
        name: 'switchCamera',
        customStyle: { justifyContent: 'flex-start' },
        props: {},
      },
      { name: 'virtualBackground' },
      {
        name: 'camera',
        customStyle: { justifyContent: 'flex-end' },
        props: {},
      },
    ],
    [
      {
        name: 'reject',
        customStyle: { paddingTop: '6vh', justifyContent: 'center' },
      },
      {},
      {
        name: 'accept',
        customStyle: { paddingTop: '6vh', justifyContent: 'center' },
      },
    ],
  ],
  connected: [
    [
      {
        name: 'microphone',
        customStyle: { justifyContent: 'flex-start' },
        props: {},
      },
      { name: 'speaker' },
      {
        name: 'camera',
        customStyle: { justifyContent: 'flex-end' },
        props: {},
      },
    ],
    [
      {
        name: 'virtualBackground',
        customStyle: { justifyContent: 'center', paddingTop: '6vh' },
        props: {},
      },
      { name: 'hangup', customStyle: { paddingTop: '6vh' } },
      {
        name: 'switchCamera',
        customStyle: { justifyContent: 'center', paddingTop: '6vh' },
        props: {},
      },
    ],
  ],
};
