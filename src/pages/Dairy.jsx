import React, { useState, useRef } from 'react';

function Dairy() {
  const [started, setStarted] = useState(false);
  const [entry, setEntry] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [translateLang, setTranslateLang] = useState('en');
  const [isListening, setIsListening] = useState(false);
  const [lockMode, setLockMode] = useState(false);
  const [showLockScreen, setShowLockScreen] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [translatedText, setTranslatedText] = useState('');

  const recognitionRef = useRef(null);

  const languages = [
    { label: 'English', value: 'en-US', trans: 'en' },
    { label: 'Hindi', value: 'hi-IN', trans: 'hi' },
    { label: 'Telugu', value: 'te-IN', trans: 'te' },
    { label: 'Tamil', value: 'ta-IN', trans: 'ta' },
    { label: 'Spanish', value: 'es-ES', trans: 'es' },
    { label: 'French', value: 'fr-FR', trans: 'fr' },
    { label: 'German', value: 'de-DE', trans: 'de' },
    { label: 'Japanese', value: 'ja-JP', trans: 'ja' },
    { label: 'Chinese', value: 'zh-CN', trans: 'zh' },
    { label: 'Arabic', value: 'ar-SA', trans: 'ar' },
    { label: 'Russian', value: 'ru-RU', trans: 'ru' },
    { label: 'Portuguese', value: 'pt-PT', trans: 'pt' },
    { label: 'Turkish', value: 'tr-TR', trans: 'tr' },
  ];

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert('Speech Recognition not supported');

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = language;

    recognitionRef.current.onresult = (e) => {
      let finalTranscript = '';
      for (let i = e.resultIndex; i < e.results.length; ++i) {
        const transcript = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        }
      }
      if (finalTranscript.trim()) {
        setEntry((prev) => prev + ' ' + finalTranscript.trim());
      }
    };

    recognitionRef.current.onend = () => setIsListening(false);
    recognitionRef.current.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const speakText = (text) => {
    if (!window.speechSynthesis) return alert('Speech synthesis not supported');
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    window.speechSynthesis.speak(utterance);
  };

  const handleTranslate = async () => {
    if (!entry.trim()) return alert('Nothing to translate!');
    const fromLang = languages.find((l) => l.value === language)?.trans || 'en';
    const toLang = translateLang;

    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(entry)}&langpair=${fromLang}|${toLang}`
      );
      const data = await res.json();
      const translated = data.responseData.translatedText;
      setTranslatedText(translated);
    } catch {
      alert('Translation failed.');
    }
  };

  const saveDiary = async (pwd) => {
    if (!entry.trim()) return alert('Diary is empty!');
    if (isSaving) return;

    const diary = {
      content: entry,
      language,
      translated: translateLang,
      date: new Date().toLocaleString(),
      locked: lockMode,
      password: lockMode ? pwd : null,
    };

    try {
      setIsSaving(true);
      const res = await fetch('http://localhost:5000/api/diary/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(diary),
      });

      if (res.ok) {
        alert('Diary Saved ✅');
        window.location.href = '/saved';
      } else {
        const err = await res.json();
        alert(err.message);
      }
    } catch {
      alert('Saving failed.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = () => {
    if (lockMode) {
      setShowLockScreen(true);
    } else {
      saveDiary(null);
    }
  };

  const confirmLockAndSave = () => {
    if (password !== confirmPassword) return alert('Passwords do not match!');
    saveDiary(password);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {!started ? (
        <div className="text-center mt-20 max-w-3xl mx-auto px-4">
         <div className="bg-gradient-to-br from-blue-50 via-white to-purple-100 py-20 px-6 md:px-12 lg:px-24 text-center rounded-xl shadow-2xl max-w-5xl mx-auto animate-fade-in">
  <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 mb-6 leading-tight drop-shadow-lg">
    Welcome to Your Lifebox NextGen Diary 📝
  </h1>

  <p className="text-gray-800 dark:text-gray-200 mb-8 text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
    Express yourself in any language — using voice or text. Translate your thoughts instantly and store them
    safely, just like a personal vault of memories.
  </p>

  <ul className="text-left text-gray-700 dark:text-gray-300 mb-10 space-y-4 text-lg md:text-xl font-semibold mx-auto max-w-xl pl-6 list-disc list-inside bg-white/70 backdrop-blur-md rounded-lg p-6 shadow-md border border-blue-200">
    <li className="transition hover:translate-x-2 duration-300">✅ Speak or type your thoughts</li>
    <li className="transition hover:translate-x-2 duration-300">✅ Translate to your favorite language</li>
    <li className="transition hover:translate-x-2 duration-300">✅ Listen and feel your emotions</li>
    <li className="transition hover:translate-x-2 duration-300">✅ Save securely to your personal diary</li>
  </ul>

  <button
    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-transform duration-300 font-bold text-lg tracking-wide"
    onClick={() => setStarted(true)}
  >
    🎤 Start Now
  </button>
</div>

        </div>
      ) : showLockScreen ? (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">🔐 Set a Password</h2>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
            onClick={confirmLockAndSave}
          >
            ✅ Confirm & Save
          </button>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-4 mb-8">
            <div className="flex flex-col w-full sm:w-48">
              <label className="text-sm font-semibold text-gray-700 mb-2">🎙️ Voice Language</label>
              <select
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-full sm:w-48">
              <label className="text-sm font-semibold text-gray-700 mb-2">🌍 Translate To</label>
              <select
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={translateLang}
                onChange={(e) => setTranslateLang(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.trans} value={lang.trans}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 items-end flex-wrap">
              {!isListening ? (
                <button
                  onClick={startListening}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
                >
                  🎤 Start
                </button>
              ) : (
                <button
                  onClick={stopListening}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-semibold"
                >
                  🛑 Stop
                </button>
              )}
              <button
                onClick={handleTranslate}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 font-semibold"
              >
                🔁 Translate
              </button>
              <button
                onClick={() => speakText(entry)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 font-semibold"
              >
                🔊 Listen
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50"
              >
                💾 Save
              </button>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <input
                  type="checkbox"
                  checked={lockMode}
                  onChange={(e) => setLockMode(e.target.checked)}
                  className="h-5 w-5 text-blue-600"
                />
                Lock Diary
              </label>
            </div>
          </div>

          {/* Diary Text Area */}
          <textarea
            className="w-full h-[500px] p-6 border-2 border-gray-300 rounded-lg mb-6 text-gray-800 text-lg leading-relaxed bg-white resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Dear Diary, today I feel..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            style={{
              backgroundImage:
                'url("data:image/svg+xml;utf8,<svg height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'><line x1=\'0\' y1=\'39\' x2=\'1000\' y2=\'39\' stroke=\'%23e5e7eb\' stroke-width=\'1\'/></svg>")',
              backgroundRepeat: 'repeat-y',
              backgroundSize: '100% 40px',
            }}
          />

          {translatedText && (
            <div className="mt-6 bg-gray-50 border-l-4 border-blue-600 p-6 rounded-lg shadow-inner">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🌐 Translated Version:</h3>
              <p className="text-gray-700 whitespace-pre-line">{translatedText}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dairy;
