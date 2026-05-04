import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Bell, TrendingUp, Search, BookOpen, MessageCircle, Heart, AlertTriangle, ArrowUpRight } from 'lucide-react';

function InvestmentApp() {
  const [budget, setBudget] = useState(3000);
  const [aiMsg, setAiMsg] = useState("嗨！我是妳的專屬小老師。想知道怎麼用這 $3000 開始妳的第一步嗎？");
  const [activeTab, setActiveTab] = useState('recommend');

  // 模擬即時股價，這就是未來要接 API 的地方
  const [stocks, setStocks] = useState([
    { id: '2330', name: '台積電', price: 1050, change: '+15', tag: '必賺領頭羊', color: 'bg-[#BAE1FF]', text: 'text-blue-600', desc: '最強晶片工廠！買不起一張也沒關係，我們可以買零股。' },
    { id: '2881', name: '富邦金', price: 92.5, change: '+0.5', tag: '穩定領紅包', color: 'bg-[#BAFFC9]', text: 'text-green-600', desc: '很會賺錢的銀行。每年發股息給妳，適合長期存錢。' },
    { id: '3443', name: '創意', price: 1240, change: '-20', tag: '隱藏黑馬', color: 'bg-[#FFFFBA]', text: 'text-yellow-600', desc: 'AI 概念股，波動較大但潛力驚人，適合追求成長的妳。' },
    { id: '0050', name: '台灣50', price: 188.4, change: '+1.2', tag: '懶人首選', color: 'bg-[#E1BAFF]', text: 'text-purple-600', desc: '一次買下台灣最強50家公司，不用煩惱選哪支。' }
  ]);

  const askAI = (q) => {
    const chat = {
      '定期定額怎麼改?': '直接去富邦 App 點「台股定期定額」，選擇「變更扣款金額」就可以囉！',
      '什麼是交割?': '就是「買股票付錢的日子」。買完後兩天(T+2)記得戶頭要有錢，不然會信用破產喔！',
      '手續費優惠': '現在定期定額很多券商只要 1 元，省下的手續費又可以多買一股了。'
    };
    setAiMsg(chat[q] || "讓我想想...正在幫妳查詢最簡單的解釋！");
  };

  return (
    <div className="max-w-md mx-auto bg-[#FCFCFC] min-h-screen pb-24 shadow-xl overflow-x-hidden">
      {/* 頂部導航 - 毛玻璃效果 */}
      <header className="p-6 flex justify-between items-center sticky top-0 bg-white/70 backdrop-blur-lg z-50">
        <div>
          <h1 className="text-2xl font-black italic tracking-tighter text-slate-800">投資小白 <span className="text-pink-400">♥</span></h1>
          <p className="text-[10px] text-green-500 font-bold tracking-widest uppercase flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span> 秒級實時監控中
          </p>
        </div>
        <div className="bg-slate-100 p-2 rounded-2xl text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
          <Bell size={20} />
        </div>
      </header>

      {/* 預算看板 */}
      <section className="px-6 py-4">
        <div className="bg-white p-6 rounded-[35px] border border-slate-100 shadow-sm transition-all hover:shadow-md">
          <label className="text-[10px] text-slate-400 font-black tracking-[0.2em] uppercase">預計投入資金 (TWD)</label>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-2xl font-bold text-slate-300 mb-1">$</span>
            <input 
              type="number" 
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="bg-transparent text-4xl font-black focus:outline-none w-full text-slate-700"
            />
          </div>
        </div>
      </section>

      {/* AI 教學區 */}
      <section className="px-6 py-2">
        <div className="bg-slate-900 text-white p-6 rounded-[35px] shadow-lg relative overflow-hidden">
          <MessageCircle className="absolute -right-4 -top-4 opacity-10" size={100} />
          <div className="flex gap-4 relative z-10">
            <div className="w-10 h-10 bg-gradient-to-tr from-pink-400 to-blue-400 rounded-2xl flex-shrink-0 animate-pulse"></div>
            <div>
              <p className="text-sm font-medium leading-relaxed opacity-90">{aiMsg}</p>
              <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-1">
                {['定期定額怎麼改?', '什麼是交割?', '手續費優惠'].map(btn => (
                  <button key={btn} onClick={() => askAI(btn)} className="whitespace-nowrap bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-[10px] font-bold transition-all border border-white/5">
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 標籤導航 */}
      <nav className="flex px-8 mt-8 gap-8 border-b border-slate-50">
        {['recommend', 'danger'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-black transition-all relative ${activeTab === tab ? 'text-slate-800' : 'text-slate-300'}`}
          >
            {tab === 'recommend' ? '適合我的' : '必賠避雷'}
            {activeTab === tab && <span className={`absolute bottom-0 left-0 w-full h-1 rounded-full ${tab === 'recommend' ? 'bg-blue-400' : 'bg-red-400'}`}></span>}
          </button>
        ))}
      </nav>

      {/* 股票卡片清單 */}
      <main className="px-6 py-6 space-y-6">
        {stocks.map(stock => (
          <div key={stock.id} className="bg-white border border-slate-50 p-6 rounded-[40px] shadow-sm hover:translate-y-[-4px] transition-all">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${stock.color} flex items-center justify-center font-black text-white text-xs`}>
                  {stock.id.slice(0,2)}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">{stock.name}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{stock.id}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-slate-800">${stock.price}</p>
                <p className={`text-[10px] font-bold ${stock.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.change} (今日)
                </p>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-slate-50/50 rounded-[25px]">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${stock.change.includes('+') ? 'bg-green-400' : 'bg-red-400'}`}></span>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{stock.tag}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed italic">“{stock.desc}”</p>
            </div>
          </div>
        ))}
      </main>

      {/* 底部功能列 */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/90 backdrop-blur-xl border border-white shadow-2xl p-4 flex justify-around items-center rounded-[30px] z-[100]">
        <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl cursor-pointer"><TrendingUp size={22} /></div>
        <div className="p-3 text-slate-300 hover:text-slate-500 transition-colors cursor-pointer"><Search size={22} /></div>
        <div className="p-3 text-slate-300 hover:text-slate-500 transition-colors cursor-pointer"><Heart size={22} /></div>
        <div className="p-3 text-slate-300 hover:text-slate-500 transition-colors cursor-pointer"><BookOpen size={22} /></div>
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<InvestmentApp />);
