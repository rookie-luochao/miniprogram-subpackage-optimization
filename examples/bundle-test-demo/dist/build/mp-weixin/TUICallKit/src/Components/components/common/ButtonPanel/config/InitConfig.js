'use strict';
const e = {
  mobile: {
    singleCall: {
      video: {
        calling: [[], [{}, { name: 'hangup' }, {}]],
        accept: [
          [],
          [
            { name: 'reject', customStyle: { justifyContent: 'flex-end' } },
            {},
            { name: 'accept', customStyle: { justifyContent: 'flex-start' } },
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
            {},
            { name: 'hangup', customStyle: { paddingTop: '6vh' } },
            {
              name: 'switchCamera',
              customStyle: { justifyContent: 'center', paddingTop: '6vh' },
              props: {},
            },
          ],
        ],
      },
      audio: {
        calling: [[], [{}, { name: 'hangup' }, {}]],
        accept: [
          [],
          [
            { name: 'reject', customStyle: { justifyContent: 'flex-end' } },
            {},
            { name: 'accept', customStyle: { justifyContent: 'flex-start' } },
          ],
        ],
        connected: [
          [],
          [
            {
              name: 'microphone',
              customStyle: { justifyContent: 'flex-start' },
              props: {},
            },
            { name: 'hangup' },
            { name: 'speaker', customStyle: { justifyContent: 'flex-end' } },
          ],
        ],
      },
    },
    groupCall: {
      video: {
        calling: [
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
          [{}, { name: 'hangup', customStyle: { paddingTop: '6vh' } }, {}],
        ],
        accept: [[], [{ name: 'reject' }, { name: 'accept' }]],
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
          [{}, { name: 'hangup', customStyle: { paddingTop: '6vh' } }, {}],
        ],
        close_calling: [
          [
            { name: 'microphone', props: {} },
            { name: 'speaker' },
            { name: 'camera', props: {} },
            { name: 'hangup' },
          ],
        ],
        close_connected: [
          [
            { name: 'microphone', props: {} },
            { name: 'speaker' },
            { name: 'camera', props: {} },
            { name: 'hangup' },
          ],
        ],
      },
      audio: {
        calling: [
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
          [{}, { name: 'hangup', customStyle: { paddingTop: '6vh' } }, {}],
        ],
        accept: [[], [{ name: 'reject' }, { name: 'accept' }]],
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
          [{}, { name: 'hangup', customStyle: { paddingTop: '6vh' } }, {}],
        ],
        close_calling: [
          [
            { name: 'microphone', props: {} },
            { name: 'speaker' },
            { name: 'camera', props: {} },
            { name: 'hangup' },
          ],
        ],
        close_connected: [
          [
            { name: 'microphone', props: {} },
            { name: 'speaker' },
            { name: 'camera', props: {} },
            { name: 'hangup' },
          ],
        ],
      },
    },
  },
};
exports.ButtonPanelConfig = e;
