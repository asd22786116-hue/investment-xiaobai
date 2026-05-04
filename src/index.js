import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Bell, TrendingUp, Search, BookOpen, MessageCircle, Heart, AlertTriangle } from 'lucide-react';

function InvestmentApp() {
  const [budget, setBudget] = useState(3000);
  const [aiMsg, setAiMsg] = useState("嗨！我是妳的小老師。準備好用這 $3000 開始投資了嗎？");
  const [isLoading, setIsLoading] = useState(false);

  // 1. 預留股價狀態，未來可從 API 更新
  const [stocks, setStocks] = useState([
    { id: '2330', name: '台積電', price: 1050, tag: '領頭羊', color: 'bg-[#BAE1FF]' },
    { id: '2881', name: '富邦金', price: 92.5, tag: '穩定領息', color: 'bg-[#BAFFC9]' },
    { id: '0050', name: '台灣50', price: 188.4, tag: '懶人首選', color: 'bg-[#E1BAFF]' }
  ]);

  // 2. 真正的 AI 對話函式 (預留 API 介面)
  const askAI = async (question) => {
    setIsLoading(true);
    setAiMsg("小老師正在翻書思考中...");
    
    /* 
       未來這裡會放入 fetch("https://api.openai.com/v1/chat/completions", { ... })
       妳需要填入 API Key 才能正式連動。
    */
    setTimeout(() => {
      const mockResponses = {
        '定期定額怎麼改?': "去富邦 App 點『變更扣款金額』就好囉！",
        '預算可以買幾股?': `依照妳的預算，大約可以買入 ${Math.floor(budget / stocks[0].price)} 股台積電零股喔！`
      };
      setAiMsg(mockResponses[question] || "這超出了我的預設，未來接上 OpenAI 我就能回答妳了！");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto bg-[#FCFCFC] min-h-screen pb-24 shadow-xl">
      {/* 標題與預算 */}
      <header className="p-6">
        <h1 className="text-2xl font-black italic tracking-tighter">投資小白 <span className="text-pink-400">♥</span></h1>
        <div className="mt-4 bg-white p-6 rounded-[35px] border border-slate-100 shadow-sm">
          <label className="text-[10px] text-slate-400 font-black tracking-widest uppercase">妳目前的預算 (TWD)</label>
          <input 
            type="number" 
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="text-4xl font-black focus:outline-none w-full text-slate-700 mt-2"
          />
        </div>
      </header>

      {/* AI 對話區 */}
      <section className="px-6">
        <div className="bg-slate-900 text-white p-6 rounded-[35px] shadow-lg">
          <p className={`text-sm leading-relaxed ${isLoading ? 'animate-pulse' : ''}`}>{aiMsg}</p>
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
            {['定期定額怎麼改?', '預算可以買幾股?'].map(btn => (
              <button key={btn} onClick={() => askAI(btn)} className="whitespace-nowrap bg-white/10 px-4 py-2 rounded-full text-[10px] font-bold border border-white/5">
                {btn}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 股票清單與計算邏輯 */}
      <main className="px-6 py-6 space-y-4">
        {stocks.map(stock => (
          <div key={stock.id} className="bg-white border border-slate-50 p-6 rounded-[40px] shadow-sm">
            <div className="flex justify-between">
              <h3 className="font-bold text-lg">{stock.name}</h3>
              <p className="font-black text-slate-800">${stock.price}</p>
            </div>
            {/* 這裡就是預算連動推薦功能 */}
            <div className="mt-4 p-4 bg-slate-50 rounded-[25px]">
              <p className="text-[10px] font-black text-blue-500 uppercase">小老師試算結果</p>
              <p className="text-xs mt-1 font-medium">妳的預算目前可以買進 <span className="text-pink-500 font-bold">{Math.floor(budget / stock.price)}</span> 股</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<InvestmentApp />);
