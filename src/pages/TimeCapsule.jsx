import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

function TimeCapsule() {
  const [capsules, setCapsules] = useState([]);
  const [type, setType] = useState('letter');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [unlockDate, setUnlockDate] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaURL, setMediaURL] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [errors, setErrors] = useState({});

  const capsuleTypes = [
    { value: 'letter', label: 'Letter to Loved Ones' },
    { value: 'prediction', label: 'Prediction Capsule' },
    { value: 'inspiration', label: 'Inspirational Capsule' },
    { value: 'reminder', label: 'Future Reminder' },
  ];

  useEffect(() => {
    if (mediaFile) {
      const url = URL.createObjectURL(mediaFile);
      setMediaURL(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setMediaURL('');
    }
  }, [mediaFile]);

  useEffect(() => {
    if (audioFile) {
      const url = URL.createObjectURL(audioFile);
      setAudioURL(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setAudioURL('');
    }
  }, [audioFile]);

  useEffect(() => {
    if (type !== 'letter') {
      setMediaFile(null);
      setMediaType('');
      setAudioFile(null);
      setIsPublic(false);
    }
    setErrors({});
    setTitle('');
    setMessage('');
    setUnlockDate('');
  }, [type]);

  const validate = () => {
    const newErrors = {};
    if ((type === 'letter' || type === 'prediction' || type === 'reminder') && !title.trim()) {
      newErrors.title = 'Title is required.';
    }
    if (!message.trim()) newErrors.message = 'Message is required.';
    if (!unlockDate) {
      newErrors.unlockDate = 'Unlock date is required.';
    } else {
      const unlockDateObj = new Date(unlockDate);
      if (isNaN(unlockDateObj.getTime())) {
        newErrors.unlockDate = 'Unlock date is invalid.';
      } else if (unlockDateObj <= new Date()) {
        newErrors.unlockDate = 'Unlock date must be in the future.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (!validate()) return;

    const newCapsule = {
      id: Date.now(),
      type,
      title: title.trim(),
      message: message.trim(),
      unlockDate: new Date(unlockDate),
      isPublic: type === 'letter' ? isPublic : false,
      mediaFile,
      mediaURL,
      mediaType,
      audioFile,
      audioURL,
    };

    setCapsules((prev) => [newCapsule, ...prev]);

    setTitle('');
    setMessage('');
    setUnlockDate('');
    setMediaFile(null);
    setMediaType('');
    setAudioFile(null);
    setAudioURL('');
    setIsPublic(false);
    setErrors({});
  };

  const minDateTimeLocal = new Date().toISOString().slice(0, 16);
  const formatDate = (date) =>
    date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const isCreateDisabled =
    (type !== 'inspiration' && !title.trim()) ||
    !message.trim() ||
    !unlockDate ||
    Object.keys(errors).length > 0;

  const lockedCapsules = capsules.filter((c) => new Date() < c.unlockDate);
  const getCapsuleLabel = (val) =>
    capsuleTypes.find((c) => c.value === val)?.label || val;

  const renderFormFields = () => (
    <>
      {(type === 'letter' || type === 'prediction' || type === 'reminder') && (
        <label className="flex flex-col">
          <span className="text-sm font-semibold text-gray-700 mb-2">Title</span>
          <input
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 hover:bg-blue-50"
          />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
        </label>
      )}

      <label className="flex flex-col">
        <span className="text-sm font-semibold text-gray-700 mb-2">Message</span>
        <textarea
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg min-h-[100px] resize-y focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 hover:bg-blue-50"
        />
        {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
      </label>

      {type === 'letter' && (
        <>
          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="h-5 w-5 text-blue-600"
            />
            <span className="text-sm font-semibold text-gray-700">Make Public</span>
          </label>

          <label className="flex flex-col mt-4">
            <span className="text-sm font-semibold text-gray-700 mb-2">Attach Photo/Video</span>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                setMediaFile(file);
                setMediaType(file.type.startsWith('video') ? 'video' : 'image');
              }}
              className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:hover:bg-blue-700"
            />
          </label>

          {mediaURL && mediaType === 'image' && (
            <img
              src={mediaURL}
              alt="Media Preview"
              className="mt-4 w-full max-w-md rounded-lg shadow-md object-contain"
            />
          )}
          {mediaURL && mediaType === 'video' && (
            <video
              src={mediaURL}
              controls
              className="mt-4 w-full max-w-md rounded-lg shadow-md"
            />
          )}

          <label className="flex flex-col mt-4">
            <span className="text-sm font-semibold text-gray-700 mb-2">Attach Voice Note</span>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                setAudioFile(file);
              }}
              className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:hover:bg-blue-700"
            />
          </label>
          {audioURL && (
            <audio
              controls
              src={audioURL}
              className="mt-4 w-full max-w-md rounded-lg"
            />
          )}
        </>
      )}

      <label className="flex flex-col mt-4">
        <span className="text-sm font-semibold text-gray-700 mb-2">Unlock Date & Time</span>
        <input
          type="datetime-local"
          min={minDateTimeLocal}
          value={unlockDate}
          onChange={(e) => setUnlockDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 hover:bg-blue-50"
        />
        {errors.unlockDate && <p className="text-red-600 text-sm mt-1">{errors.unlockDate}</p>}
      </label>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white/80 backdrop-blur-lg rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Time Capsules</h1>

        <div className="flex flex-col gap-6 mb-10">
          <label className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700 mb-2">Capsule Type</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 hover:bg-blue-50"
            >
              {capsuleTypes.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          {renderFormFields()}

          <button
            onClick={handleCreate}
            disabled={isCreateDisabled}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold uppercase tracking-wide hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed active:scale-95"
          >
            Create Capsule
          </button>
        </div>

        <hr className="border-gray-300 my-8" />

        <section className="bg-blue-50/50 backdrop-blur-sm rounded-lg p-6 shadow-md mb-10">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Upcoming Shared Capsules Preview</h2>
          {lockedCapsules.length === 0 && (
            <p className="text-gray-600 text-sm">No locked capsules currently shared for the future.</p>
          )}
          {lockedCapsules.map((capsule) => (
            <div
              key={capsule.id}
              className="bg-blue-100/40 rounded-lg p-5 mb-4 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold text-blue-900">{capsule.title || '(No Title)'}</h3>
              <p className="text-sm font-semibold text-blue-700">Type: {getCapsuleLabel(capsule.type)}</p>
              <p className="text-sm font-semibold text-blue-700">Unlocks: {formatDate(capsule.unlockDate)}</p>
              <p className="text-sm text-blue-800 mt-2 italic">
                {capsule.message.length > 120 ? capsule.message.slice(0, 117) + '...' : capsule.message}
              </p>
            </div>
          ))}
        </section>

        <hr className="border-gray-300 my-8" />

        <div className="flex flex-col gap-6 max-h-[55vh] overflow-y-auto pr-2">
          {capsules.length === 0 && (
            <p className="text-gray-600 text-center text-sm">No capsules created yet.</p>
          )}
          {capsules.map((capsule) => {
            const unlocked = new Date() >= capsule.unlockDate;
            return (
              <article
                key={capsule.id}
                className={`bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-md border-l-4 ${
                  unlocked ? 'border-blue-600' : 'border-gray-400'
                } transition-all duration-200 hover:shadow-lg hover:-translate-y-1`}
              >
                <h3 className="text-lg font-semibold text-gray-900">{capsule.title || '(No Title)'}</h3>
                <p className="text-sm font-semibold text-gray-600">Type: {getCapsuleLabel(capsule.type)}</p>
                <p className="text-sm font-semibold text-gray-600">Unlocks: {formatDate(capsule.unlockDate)}</p>

                {!unlocked ? (
                  <p className="text-gray-600 italic flex items-center gap-2 mt-3 animate-fade-in">
                    <span>🔒 Locked</span>
                  </p>
                ) : (
                  <>
                    <p className="text-gray-700 mt-3 whitespace-pre-wrap">{capsule.message}</p>
                    {capsule.mediaURL && capsule.mediaType === 'image' && (
                      <img
                        src={capsule.mediaURL}
                        alt="Attached"
                        className="mt-4 w-full max-w-md rounded-lg shadow-md object-contain"
                      />
                    )}
                    {capsule.mediaURL && capsule.mediaType === 'video' && (
                      <video
                        src={capsule.mediaURL}
                        controls
                        className="mt-4 w-full max-w-md rounded-lg shadow-md"
                      />
                    )}
                    {capsule.audioURL && (
                      <audio
                        controls
                        src={capsule.audioURL}
                        className="mt-4 w-full max-w-md rounded-lg"
                      />
                    )}
                    {capsule.type === 'letter' && capsule.isPublic && (
                      <span className="inline-block mt-3 px-3 py-1 bg-blue-600 text-white text-xs font-semibold uppercase rounded-full">
                        Public Capsule
                      </span>
                    )}
                  </>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TimeCapsule;
