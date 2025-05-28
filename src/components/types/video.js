/**
 * @typedef {Object} VideoClip
 * @property {string} id - Unique identifier for the clip
 * @property {string} name - Name of the clip
 * @property {'video' | 'audio' | 'image'} type - Type of the clip
 * @property {number} duration - Duration of the clip in seconds
 * @property {string} src - Source URL of the clip
 * @property {string} thumbnail - Thumbnail URL of the clip
 * @property {number} [startTime] - Optional start time of the clip in the timeline
 * @property {number} [endTime] - Optional end time of the clip in the timeline
 */

/**
 * @typedef {Object} AudioTrack
 * @property {string} id - Unique identifier for the audio track
 * @property {string} name - Name of the audio track
 * @property {string} src - Source URL of the audio
 * @property {number} startTime - Start time of the audio in the timeline
 * @property {number} duration - Duration of the audio in seconds
 * @property {number} volume - Volume level of the audio (0 to 1)
 */

/**
 * @typedef {Object} TextEffect
 * @property {string} id - Unique identifier for the text effect
 * @property {string} text - Text content of the effect
 * @property {number} startTime - Start time of the text effect in the timeline
 * @property {number} duration - Duration of the text effect in seconds
 * @property {string} style - Style of the text (e.g., 'Title', 'Subtitle')
 * @property {{ x: number, y: number }} position - Position of the text on the screen
 */

/**
 * @typedef {Object} VideoEffect
 * @property {string} id - Unique identifier for the video effect
 * @property {string} type - Type of the video effect (e.g., 'Fade', 'Dissolve')
 * @property {number} startTime - Start time of the effect in the timeline
 * @property {number'} startTime - Start time of the effect in the timeline
 * @property {number} duration - Duration of the effect in seconds
 * @property {Object.<string, any>} parameters - Additional parameters for the effect
 */

/**
 * @typedef {Object} VideoProject
 * @property {string} id - Unique identifier for the project
 * @property {string} name - Name of the project
 * @property {Date} createdAt - Creation date of the project
 * @property {Date} updatedAt - Last updated date of the project
 * @property {number} duration - Total duration of the project in seconds
 * @property {VideoClip[]} clips - Array of video clips in the project
 * @property {AudioTrack[]} audio - Array of audio tracks in the project
 * @property {(TextEffect | VideoEffect)[]} effects - Array of text or video effects
 * @property {'720p' | '1080p' | '4K'} resolution - Resolution of the project
 */

/**
 * Creates a new empty video project
 * @returns {VideoProject}
 */
export function createNewProject() {
  return {
    id: `video-${Date.now()}`,
    name: 'Untitled Video',
    createdAt: new Date(),
    updatedAt: new Date(),
    duration: 0,
    clips: [],
    audio: [],
    effects: [],
    resolution: '720p',
  };
}