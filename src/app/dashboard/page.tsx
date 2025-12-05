"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { User, Flame, Clock, CheckCircle, BarChart2, ArrowRight } from 'lucide-react';
// Import Library กราฟ
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // ✅ ดึงข้อมูลจาก API จริง (ใช้ 127.0.0.1 เพื่อความชัวร์)
    fetch('http://127.0.0.1:8000/api/summary')
      .then(res => res.json())
      .then(data => {
        console.log("Dashboard Data:", data); // เช็คดูว่าข้อมูลมาไหม
        setData(data);
      })
      .catch(err => {
        console.error("Failed to fetch dashboard data:", err);
        // ถ้าต่อไม่ได้ ให้ใช้ข้อมูล 0 ไปก่อน หน้าเว็บจะได้ไม่พัง
        setData({ total_sentences: 0, streak: 0, history: [] });
      });
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg font-sans p-6 flex flex-col items-center text-brand-dark">
      
      {/* Navbar */}
      <nav className="w-full max-w-4xl flex justify-between items-center mb-10 text-white">
        <h1 className="text-2xl font-bold tracking-tight">worddee.ai</h1>
        <div className="flex items-center gap-6 text-sm font-medium">
             <Link href="/" className="hover:opacity-80 transition-opacity">Word of the Day</Link>
             <span className="border-b-2 border-white pb-1 cursor-pointer">My Progress</span>
             <div className="bg-white text-brand-bg rounded-full p-1.5 shadow-sm">
                <User size={18} />
             </div>
        </div>
      </nav>

      {/* Main Dashboard Card */}
      <main className="w-full max-w-3xl bg-brand-card rounded-[32px] p-10 shadow-2xl min-h-[700px]">
        {data ? (
        <>
            {/* Header Title */}
            <div className="mb-8">
               <h2 className="text-3xl font-serif font-bold text-brand-dark">Learner dashboard</h2>
               <p className="text-brand-subtext mt-1">Check your daily progress and stats.</p>
            </div>

            {/* Missions Section (Green Box) */}
            <div className="mb-10">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Your missions today</h3>
                <div className="bg-[#F0FDF4] border border-green-100 p-5 rounded-2xl flex items-center gap-4 text-green-800 shadow-sm">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                        <CheckCircle className="text-green-600" size={24} />
                    </div>
                    <div>
                        <span className="font-bold block text-lg">Well done!</span>
                        <span className="text-sm opacity-80">You’ve completed all your missions.</span>
                    </div>
                </div>
            </div>

            {/* Overview Section */}
            <div className="mb-10">
                <h3 className="text-2xl font-serif font-bold text-brand-dark mb-6">Overview</h3>
                
                <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                    
                    <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-4">
                        <BarChart2 size={20} className="text-brand-dark" />
                        <h4 className="font-bold text-gray-700">Learning Consistency</h4>
                    </div>

                    {/* Stats Row */}
                    <div className="flex justify-around items-center text-center mb-8">
                        <div className="flex flex-col items-center gap-2">
                             <Flame className="text-[#84CC16] fill-[#84CC16]" size={40} />
                             <div>
                                <span className="text-4xl font-serif font-bold text-brand-dark">{data.streak}</span>
                                <p className="text-xs text-gray-400 font-bold uppercase mt-1">Day streak</p>
                             </div>
                        </div>

                        <div className="w-px h-16 bg-gray-100"></div>

                        <div className="flex flex-col items-center gap-2">
                             <Clock className="text-[#3B82F6]" size={40} />
                             <div>
                                <span className="text-4xl font-serif font-bold text-brand-dark">{data.total_sentences}</span>
                                <p className="text-xs text-gray-400 font-bold uppercase mt-1">Sentences done</p>
                             </div>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div className="h-64 w-full">
                         <p className="text-xs text-gray-400 font-bold uppercase mb-4 text-center">Weekly Performance</p>
                         <div className="w-full h-full">
                           <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={data.history}>
                                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                                  {/* กราฟแท่ง: ถ้าคะแนนเกิน 8 เป็นสีเข้ม ถ้าต่ำกว่าเป็นสีเทา */}
                                  <Bar dataKey="score" radius={[6, 6, 6, 6]} barSize={40}>
                                      {data.history && data.history.map((entry: any, index: number) => (
                                          <Cell key={`cell-${index}`} fill={entry.score >= 8 ? '#1A2C2C' : '#CBD5E1'} />
                                      ))}
                                  </Bar>
                              </BarChart>
                          </ResponsiveContainer>
                         </div>
                    </div>
                </div>
            </div>

            {/* Footer CTA */}
            <div className="text-center">
                <Link href="/" className="inline-flex items-center gap-2 px-8 py-3 bg-brand-dark text-white font-bold rounded-full hover:opacity-90 transition shadow-lg">
                    Take a new challenge <ArrowRight size={18}/>
                </Link>
            </div>
        </>
        ) : (
           <div className="h-[600px] flex flex-col items-center justify-center text-gray-400">
               <div className="w-10 h-10 border-4 border-gray-200 border-t-brand-dark rounded-full animate-spin mb-4"></div>
               Loading stats...
           </div>
        )}
      </main>
    </div>
  );
}