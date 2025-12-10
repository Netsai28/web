'use client';
import React, { useState, useEffect } from 'react';
import { RefreshCw, Play, CheckCircle, Award, User, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

// --- ⚡ คลังรูปภาพด่วน (Direct Links) ---
// ใช้ลิงก์ตรงจาก Unsplash + ปรับขนาดให้เล็ก (w=600) เพื่อให้โหลดไวที่สุด
const FAST_IMAGES: Record<string, string> = {
  // Beginner
  "runway": "https://media.istockphoto.com/id/1256696490/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%A3%E0%B8%B1%E0%B8%99%E0%B9%80%E0%B8%A7%E0%B8%A2%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B9%88%E0%B8%B2%E0%B8%AA%E0%B8%99%E0%B8%B2%E0%B8%A1%E0%B8%9A%E0%B8%B4%E0%B8%99%E0%B8%A2%E0%B8%B2%E0%B8%87%E0%B8%A1%E0%B8%B0%E0%B8%95%E0%B8%AD%E0%B8%A2%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B8%81%E0%B8%A3%E0%B8%B5%E0%B8%95%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A1%E0%B8%B5%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%9A%E0%B8%A3%E0%B8%81%E0%B8%88%E0%B9%8D%E0%B8%B2%E0%B8%99%E0%B8%A7%E0%B8%99%E0%B8%A1%E0%B8%B2%E0%B8%81%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B8%AA.jpg?s=612x612&w=0&k=20&c=vjgcillIsT6N0VPNRt3YXh2giCx5QygrnAIP0mK4uTM=",
  "journey": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80",
  "happy": "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80",
  "market": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
  "build": "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=600&q=80",
  "dream": "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80",
  
  // Intermediate
  "resilient": "https://images.unsplash.com/photo-1500053766928-d254d666933b?w=600&q=80",
  "establish": "https://images.unsplash.com/photo-1464059728276-d877187d61a9?w=600&q=80",
  "ambition": "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80",
  "perspective": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
  "generate": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
  "unique": "https://images.unsplash.com/photo-1508161773465-48904830881d?w=600&q=80",
  
  // Advanced
  "serendipity": "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=600&q=80",
  "ephemeral": "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600&q=80",
  "ubiquitous": "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=600&q=80",
  "mellifluous": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
  "cognizant": "https://images.unsplash.com/photo-1555449377-5a0d932d7e8d?w=600&q=80",
  "paradigm": "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=600&q=80",
  "eloquent": "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80",
  "pragmatic": "https://images.unsplash.com/photo-1512314889357-e15a8c389c27?w=600&q=80"
};

export default function ChallengePage() {
  const [history, setHistory] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [word, setWord] = useState<any>(null);
  const [sentence, setSentence] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  // 1. ฟังก์ชันดึงคำใหม่
  const fetchWord = async () => {
    setLoading(true);
    setFeedback(null);
    setSentence('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/word');
      if (!res.ok) throw new Error("Error");
      const data = await res.json();
      
      const newHistory = [...history, data];
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
      setWord(data);
    } catch (error) { console.error(error); } 
    finally { setLoading(false); }
  };

  // 2. ฟังก์ชันย้อนกลับ
  const handleDoItLater = () => {
    if (currentIndex > 0) {
        const prevIndex = currentIndex - 1;
        setCurrentIndex(prevIndex);
        setWord(history[prevIndex]);
        setFeedback(null);
        setSentence('');
    } else {
        fetchWord();
    }
  };

  useEffect(() => { fetchWord(); }, []);

  const handleSubmit = async () => {
    if (!sentence.trim() || !word) return;
    setChecking(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/validate-sentence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word_text: word?.word || '', sentence })
      });
      const data = await res.json();
      setFeedback(data);
    } catch (error) { alert("Connection Error"); } 
    finally { setChecking(false); }
  };

  const playAudio = () => {
    if (!word?.word) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  // ⚡ ฟังก์ชันเลือกรูป (ปรับให้ไวที่สุด)
  const getImageUrl = (k: string) => {
      const key = k.toLowerCase();
      // ถ้ามีในคลัง ใช้เลย! (ไม่ต้องรอโหลด)
      if (FAST_IMAGES[key]) return FAST_IMAGES[key];
      // ถ้าไม่มีจริงๆ ค่อยให้ AI วาด
      return `https://image.pollinations.ai/prompt/minimalist%20illustration%20of%20${key}?width=600&height=600&nologo=true`;
  };

  return (
    <div className="min-h-screen bg-[#8E9F9F] font-sans p-6 flex flex-col items-center justify-center text-[#1A2C2C]">
      
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

      <main className="w-full max-w-3xl bg-white rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        <div className="mb-6">
            <h2 className="text-4xl font-serif font-bold text-[#1A2C2C] mb-2">Word of the day</h2>
            <p className="text-gray-500 text-sm">Practice writing a meaningful sentence using today's word.</p>
        </div>

        {loading && !word ? (
           <div className="h-80 flex flex-col items-center justify-center text-gray-400 gap-4">
               <div className="w-12 h-12 border-4 border-gray-200 border-t-[#1A2C2C] rounded-full animate-spin"></div>
               <p className="font-medium animate-pulse">Loading word...</p>
           </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-6 mb-8 relative">
                 <div className="w-full md:w-48 h-48 bg-gray-100 rounded-2xl overflow-hidden shrink-0 shadow-inner relative group">
                    <img 
                        src={getImageUrl(word.word)} 
                        className="w-full h-full object-cover transition-opacity duration-500"
                        loading="eager" // ⚡ สั่งให้โหลดทันทีไม่ต้องรอ
                    />
                    <button onClick={fetchWord} className="absolute top-2 right-2 bg-white/90 p-2 rounded-full hover:bg-white transition shadow-sm z-10" title="New Word">
                        <RefreshCw size={16} className="text-gray-700"/>
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

            <div className="mb-8">
                <textarea
                    value={sentence}
                    onChange={(e) => setSentence(e.target.value)}
                    placeholder={`Compose a sentence using "${word.word}"...`}
                    className="w-full h-24 p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1A2C2C] focus:ring-1 focus:ring-[#1A2C2C] outline-none text-gray-700 resize-none transition-all placeholder:text-gray-400 text-lg"
                />
            </div>

            <div className="flex justify-between items-center">
                <button 
                    onClick={handleDoItLater}
                    className="px-8 py-3 rounded-full border border-gray-300 text-gray-500 font-bold hover:bg-gray-50 transition-colors hover:text-[#1A2C2C] flex items-center gap-2"
                >
                    {currentIndex > 0 ? <ChevronLeft size={18}/> : null} Do it later
                </button>
                
                <button 
                    onClick={handleSubmit}
                    disabled={checking || !sentence.trim()}
                    className="px-10 py-3 rounded-full bg-[#1A2C2C] text-white font-bold hover:bg-[#2C3E3E] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg transform active:scale-95"
                >
                    {checking ? 'Checking...' : 'Submit'}
                </button>
            </div>

            {feedback && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-md flex items-center justify-center p-6 z-30 animate-in fade-in zoom-in-95 duration-300">
                    <div className="bg-white w-full max-w-lg p-8 rounded-3xl shadow-2xl border border-gray-100 text-center relative">
                        <button onClick={() => setFeedback(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2">✕</button>

                        <h3 className="text-3xl font-serif font-bold text-[#1A2C2C] mb-6">Challenge completed</h3>
                        
                        <div className="flex justify-center gap-3 mb-8">
                            <span className="bg-[#FDE68A] text-[#92400E] px-5 py-2 rounded-full text-sm font-bold shadow-sm">Level {feedback.level}</span>
                            <span className="bg-[#E0E7FF] text-[#3730A3] px-5 py-2 rounded-full text-sm font-bold shadow-sm">Score {feedback.score}</span>
                        </div>

                        <div className="bg-[#ECFDF5] p-6 rounded-2xl border border-green-100 mb-6 text-left shadow-inner">
                             <p className="font-bold text-[#166534] mb-2 flex items-center gap-2 uppercase text-xs tracking-wider">
                                <CheckCircle size={16}/> Grading Feedback
                             </p>
                             <p className="text-[#15803D] text-sm leading-relaxed font-medium">{feedback.suggestion}</p>
                        </div>

                        <div className="mb-8 text-left pl-4 border-l-4 border-gray-200 py-1">
                             <p className="text-xs text-gray-400 uppercase font-bold mb-1">Corrected Sentence</p>
                             <p className="text-gray-700 italic">{feedback.corrected_sentence}</p>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => setFeedback(null)} className="flex-1 py-3.5 rounded-full border-2 border-gray-200 font-bold text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition" >
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
        )}
      </main>
    </div>
  );
}