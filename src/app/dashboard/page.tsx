'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { User, Flame, Clock, CheckCircle, BarChart2, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  // ดึงข้อมูลจาก Backend
  useEffect(() => {
    fetch('http://localhost:8000/api/summary')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error(err));
  }, []);

  return (
    // พื้นหลังสีเขียว Theme #8E9F9F
    <div className="min-h-screen bg-[#8E9F9F] font-sans p-6 flex flex-col items-center text-[#1A2C2C]">
      
      {/* Navbar */}
      <nav className="w-full max-w-4xl flex justify-between items-center mb-10 text-white">
        <h1 className="text-2xl font-bold tracking-tight">worddee.ai</h1>
        <div className="flex items-center gap-6 text-sm font-medium">
             <Link href="/" className="hover:text-white/80 opacity-90 transition-opacity">Word of the Day</Link>
             <span className="border-b-2 border-white pb-1 cursor-pointer">My Progress</span>
             <div className="bg-white text-[#8E9F9F] rounded-full p-1 shadow-sm">
                <User size={20} />
             </div>
        </div>
      </nav>

      {/* Main Card สีขาว มุมมน */}
      <main className="w-full max-w-3xl bg-white rounded-[32px] p-10 shadow-2xl min-h-[700px]">
        {data ? (
        <>
            {/* Header ส่วนหัว */}
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-[#1A2C2C]">Learner dashboard</h2>
                    <p className="text-gray-500 text-sm mt-1">Welcome back, keep up the good work!</p>
                </div>
            </div>

            {/* Mission Section (กรอบสีเขียว) */}
            <div className="mb-10">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Your missions today</h3>
                <div className="bg-[#F0FDF4] border border-green-100 p-5 rounded-2xl flex items-center gap-4 text-green-800 shadow-sm">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                        <CheckCircle className="text-green-600" size={24} />
                    </div>
                    <div>
                        <span className="font-bold block text-lg">All caught up!</span>
                        <span className="text-sm opacity-80">You have completed all your daily vocabulary missions.</span>
                    </div>
                </div>
            </div>

            {/* Overview Section (ส่วนที่ปรับแก้ตาม Figma) */}
            <div className="mb-10">
                <h3 className="text-2xl font-serif font-bold text-[#1A2C2C] mb-6">Overview</h3>
                
                <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm ring-1 ring-gray-50">
                    {/* หัวข้อ Learning Consistency */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-1">
                            <BarChart2 size={20} className="text-[#1A2C2C]" />
                            <h4 className="font-bold text-gray-700">Learning Consistency</h4>
                        </div>
                        <span className="text-sm text-gray-400 pl-7">Weekly</span>
                    </div>
                    
                    {/* สถิติ Day streak & Sentences */}
                    <div className="flex justify-around items-center text-center px-4">
                        {/* Day Streak */}
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-2 mb-2">
                                <Flame className="text-[#84CC16] fill-[#84CC16]" size={32} />
                                <span className="text-5xl font-serif font-bold text-[#1A2C2C]">{data.streak}</span>
                            </div>
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Day streak</span>
                        </div>

                        {/* เส้นคั่น */}
                        <div className="w-px h-16 bg-gray-100"></div>

                        {/* Sentences Done */}
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock className="text-[#3B82F6]" size={32} />
                                <span className="text-5xl font-serif font-bold text-[#1A2C2C]">{data.total_sentences}</span>
                            </div>
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Sentences done</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart Section (กราฟแสดงผล) */}
            <div className="mb-10 h-64 w-full">
                 <h4 className="font-bold text-gray-700 mb-4 pl-2">Weekly Performance</h4>
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.history}>
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                        <Tooltip 
                            cursor={{fill: '#F8FAFC'}} 
                            contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '12px'}}
                        />
                        <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={40}>
                            {data.history.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={entry.score >= 8 ? '#1A2C2C' : '#E2E8F0'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* ปุ่ม CTA */}
            <div className="text-center">
                <Link href="/" className="inline-flex items-center gap-3 px-8 py-4 bg-[#1A2C2C] text-white font-bold rounded-full hover:bg-[#2C3E3E] transition shadow-xl hover:shadow-2xl hover:-translate-y-1 transform">
                    Take a new challenge <ArrowRight size={18}/>
                </Link>
            </div>
        </>
        ) : (
           <div className="h-[600px] flex flex-col items-center justify-center text-gray-300 gap-4">
               <div className="w-12 h-12 border-4 border-gray-100 border-t-[#1A2C2C] rounded-full animate-spin"></div>
               <p className="font-medium">Loading stats...</p>
           </div>
        )}
      </main>
    </div>
  );
}