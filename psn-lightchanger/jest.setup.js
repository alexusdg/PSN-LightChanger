// jest.setup.js
import { TextEncoder, TextDecoder } from 'util';
import {setImmediate} from 'timers'
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;