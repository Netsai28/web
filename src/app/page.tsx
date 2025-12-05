'use client';
import React, { useState, useEffect } from 'react';
import { RefreshCw, Play, CheckCircle, Award, User } from 'lucide-react';
import Link from 'next/link';

export default function ChallengePage() {
  const [word, setWord] = useState<any>(null);
  const [sentence, setSentence] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);

  // 1. ฟังก์ชันดึงคำศัพท์
  const fetchWord = async () => {
    setLoading(true);
    setFeedback(null);
    setSentence('');
    try {
      const res = await fetch('http://localhost:8000/api/word');
      const data = await res.json();
      setWord(data);
    } catch (error) { 
      console.error("Error fetching word:", error); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { fetchWord(); }, []);

  // 2. ฟังก์ชันส่งประโยค
  const handleSubmit = async () => {
    if (!sentence.trim() || !word) return;
    setChecking(true);
    try {
      const res = await fetch('http://localhost:8000/api/validate-sentence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            word_text: word?.word || '', 
            sentence: sentence 
        })
      });
      const data = await res.json();
      setFeedback(data); // เมื่อได้ข้อมูลมาแล้ว จะไป Trigger ให้ Popup แสดงผล
    } catch (error) { 
      alert("ไม่สามารถเชื่อมต่อกับ Server ได้"); 
    } finally { 
      setChecking(false); 
    }
  };

  // 3. ฟังก์ชันเล่นเสียง
  const playAudio = () => {
    if (!word?.word) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = 'en-US'; 
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-[#8E9F9F] font-sans p-6 flex flex-col items-center justify-center text-[#1A2C2C]">
      
      {/* Navbar */}
      <nav className="w-full max-w-4xl flex justify-between items-center mb-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight">worddee.ai</h1>
        <div className="flex items-center gap-6 text-sm font-medium">
             <span className="border-b-2 border-white pb-1 cursor-pointer">Word of the Day</span>
             <Link href="/dashboard" className="hover:text-white/80 opacity-90 transition-opacity">My Progress</Link>
             <div className="bg-white text-[#8E9F9F] rounded-full p-1 shadow-sm">
                <User size={20} />
             </div>
        </div>
      </nav>

      {/* Main Card */}
      <main className="w-full max-w-3xl bg-white rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        <div className="mb-6">
            <h2 className="text-4xl font-serif font-bold text-[#1A2C2C] mb-2">Word of the day</h2>
            <p className="text-gray-500 text-sm">Practice writing a meaningful sentence using today's word.</p>
        </div>

        {word ? (
          <>
            {/* Word Section */}
            <div className="flex flex-col md:flex-row gap-6 mb-8 relative">
                 <div className="w-full md:w-48 h-48 bg-gray-100 rounded-2xl overflow-hidden shrink-0 shadow-inner relative group">
                    <img 
                        src={`https://source.unsplash.com/random/400x400/?${word.word}`} 
                        alt="word context" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <button onClick={fetchWord} className="absolute top-2 right-2 bg-white/90 p-2 rounded-full hover:bg-white transition shadow-sm z-10" title="Change Word">
                        <RefreshCw size={16} className={`text-gray-600 ${loading ? 'animate-spin' : ''}`}/>
                    </button>
                 </div>
                 
                 <div className="flex-1 border border-gray-100 rounded-2xl p-6 relative bg-gray-50/30">
                    <span className="absolute -top-3 right-4 bg-[#FDE68A] text-[#92400E] px-4 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wide">
                        Level {word.difficulty}
                    </span>

                    <div className="mt-2">
                        <div className="flex items-center gap-3 mb-2">
                            <button onClick={playAudio} className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-[#1A2C2C] hover:text-white transition-all group active:scale-95 shadow-sm">
                                <Play size={16} className="fill-current ml-1 text-[#1A2C2C] group-hover:text-white"/>
                            </button>
                            <h3 className="text-3xl font-serif font-bold text-[#1A2C2C]">{word.word}</h3>
                        </div>
                        <p className="text-gray-400 italic mb-4 font-serif text-lg">{word.part_of_speech}</p>
                        <div className="space-y-2">
                            <div>
                                <span className="font-bold text-[#1A2C2C] text-sm block mb-1">Meaning: </span>
                                <span className="text-gray-600 text-sm leading-relaxed">{word.meaning}</span>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>

            {/* Input */}
            <div className="mb-8">
                <textarea
                    value={sentence}
                    onChange={(e) => setSentence(e.target.value)}
                    placeholder={`Compose a sentence using "${word.word}"...`}
                    className="w-full h-24 p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1A2C2C] focus:ring-1 focus:ring-[#1A2C2C] outline-none text-gray-700 resize-none transition-all placeholder:text-gray-400 text-lg"
                />
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center">
                <button onClick={fetchWord} className="px-8 py-3 rounded-full border border-gray-300 text-gray-500 font-bold hover:bg-gray-50 transition-colors hover:text-[#1A2C2C]">
                    Do it later
                </button>
                <button 
                    onClick={handleSubmit}
                    disabled={checking || !sentence}
                    className="px-10 py-3 rounded-full bg-[#1A2C2C] text-white font-bold hover:bg-[#2C3E3E] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg transform active:scale-95"
                >
                    {checking ? 'Checking...' : 'Submit'}
                </button>
            </div>

            {/* 🔥 POPUP แสดงผลลัพธ์ (จะแสดงเมื่อมี feedback) */}
            {feedback && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-md flex items-center justify-center p-6 z-20 animate-in fade-in zoom-in-95 duration-300">
                    <div className="bg-white w-full max-w-lg p-8 rounded-[32px] shadow-2xl border border-gray-100 text-center relative">
                        <button onClick={() => setFeedback(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2">✕</button>

                        <h3 className="text-3xl font-serif font-bold text-[#1A2C2C] mb-6">Challenge completed</h3>
                        
                        <div className="flex justify-center gap-3 mb-8">
                            <span className="bg-[#FDE68A] text-[#92400E] px-5 py-2 rounded-full text-sm font-bold shadow-sm">Level {feedback.level}</span>
                            <span className="bg-[#E0E7FF] text-[#3730A3] px-5 py-2 rounded-full text-sm font-bold shadow-sm">Score {feedback.score}</span>
                        </div>

                        <div className="bg-[#ECFDF5] p-6 rounded-2xl border border-green-100 mb-6 text-left shadow-inner">
                             <p className="font-bold text-[#166534] mb-2 flex items-center gap-2 uppercase text-xs tracking-wider">
                                <CheckCircle size={16}/> AI Suggestion
                             </p>
                             <p className="text-[#15803D] text-sm leading-relaxed font-medium">{feedback.suggestion}</p>
                        </div>

                        <div className="mb-8 text-left pl-4 border-l-4 border-gray-200 py-1">
                             <p className="text-xs text-gray-400 uppercase font-bold mb-1">Corrected Sentence</p>
                             <p className="text-gray-700 italic">{feedback.corrected_sentence}</p>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => setFeedback(null)} className="flex-1 py-3.5 rounded-full border-2 border-gray-200 font-bold text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition">
                                Close
                            </button>
                            <Link href="/dashboard" className="flex-1 py-3.5 rounded-full bg-[#1A2C2C] text-white font-bold hover:bg-[#2C3E3E] transition shadow-lg flex items-center justify-center">
                                View my progress
                            </Link>
                        </div>
                    </div>
                </div>
            )}
          </>
        ) : (
           <div className="h-80 flex flex-col items-center justify-center text-gray-400 gap-4">
               <div className="w-12 h-12 border-4 border-gray-200 border-t-[#1A2C2C] rounded-full animate-spin"></div>
               <p className="font-medium animate-pulse">Loading word...</p>
           </div>
        )}
      </main>
    </div>
  );
}