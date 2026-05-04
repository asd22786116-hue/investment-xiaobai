import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function InvestmentApp() {
  const [budget, setBudget] = useState(3000);
  const [aiMsg, setAiMsg] = useState("嗨！我是妳的小老師。今天想聊聊什麼投資話題嗎？");
  const [activeTab, setActiveTab] = useState('recommend');

  const stocks = [
    { id: '2330', name: '台積電', price: 1050, color: 'bg-[#BAE1FF]', type: 'recommend' },
    { id: '2881', name: '富邦金', price: 92.5, color: 'bg-[#BAFFC9]', type: 'recommend' },
    { id: '0050', name: '台灣50', price: 188.4, color: 'bg-[#E1BAFF]', type: 'recommend' },
    { id: '9999', name: '地雷股', price: 45.0, color: 'bg-[#FFB3BA]', type: 'danger' }
  ];

  const filteredStocks = stocks.filter(s => s.type === activeTab);

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-20 font-sans tracking-tight">
      {/* 頂部標題 */}
      <header className="p-8 pt-12">
        <h1 className="text-3xl font-light text-slate-800">
          投資<span className="font-black">小白</span>
        </h1>
        <p className="text-[10px] text-slate-300 font-bold tracking-[0.2em] mt-2 uppercase">Minimalist Finance</p>
      </header>

      {/* 預算輸入：白淨大卡片 */}
      <section className="px-8 mb-8">
        <div className="bg-slate-50/50 p-8 rounded-[40px] border border-slate-100/50">
          <p className="text-[11px] text-slate-400 font-medium mb-1">可用資金 (TWD)</p>
          <div className="flex items-center">
            <span className="text-2xl font-light text-slate-300 mr-2">$</span>
            <input 
              type="number" 
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="text-5xl font-bold bg-transparent focus:outline-none w-full text-slate-700"
            />
          </div>
        </div>
      </section>

      {/* AI 對話：柔和馬卡龍灰藍 */}
      <section className="px-8 mb-10">
        <div className="bg-[#F8FAFC] p-6 rounded-[30px] relative">
          <div className="text-[13px] text-slate-600 leading-relaxed font-medium">
            {aiMsg}
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
            {['預算建議', '什麼是零股?'].map(q => (
              <button key={q} className="whitespace-nowrap bg-white px-4 py-2 rounded-full text-[10px] font-bold text-slate-400 border border-slate-100 hover:border-blue-200 hover:text-blue-400 transition-colors">
                {q}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 分頁控制 */}
      <div className="flex px-10 gap-8 mb-6">
        <button onClick={() => setActiveTab('recommend')} className={`text-sm font-bold transition-all ${activeTab === 'recommend' ? 'text-slate-800 scale-110' : 'text-slate-200'}`}>
          適合我的
        </button>
        <button onClick={() => setActiveTab('danger')} className={`text-sm font-bold transition-all ${activeTab === 'danger' ? 'text-red-300 scale-110' : 'text-slate-200'}`}>
          避雷區
        </button>
      </div>

      {/* 股票清單 */}
      <main className="px-8 space-y-4">
        {filteredStocks.map(stock => (
          <div key={stock.id} className="flex items-center justify-between p-6 bg-white rounded-[35px] border border-slate-50 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-4">
              <div className={`w-3 h-12 rounded-full ${stock.color}`}></div>
              <div>
                <h3 className="font-bold text-slate-700 text-base">{stock.name}</h3>
                <p className="text-[10px] text-slate-300 font-black">{stock.id}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-slate-800 text-lg">${stock.price}</p>
              <p className="text-[10px] font-bold text-blue-400 bg-blue-50 px-2 py-1 rounded-lg mt-1">
                可買 {Math.floor(budget / stock.price)} 股
              </p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<InvestmentApp />);
