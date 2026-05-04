import React, { useState, useEffect } from 'react'; 
import { Bell, ShieldAlert, TrendingUp, Search, BookOpen, MessageCircle, Heart, AlertTriangle } from 'lucide-react';

export default function InvestmentApp() {
  // --- 狀態管理 ---
  const [budget, setBudget] = useState(3000);
  const [aiMsg, setAiMsg] = useState("嗨！我是妳的專屬小老師。今天想在哪個『馬卡龍』櫃位逛逛呢？");
  const [activeTab, setActiveTab] = useState('recommend');
  const [showNotification, setShowNotification] = useState(false);

  // --- 模擬即時數據庫 (未來可對接 API) ---
  const stockList = [
    { id: '2330', name: '台積電', risk: '穩健', tag: '必賺領頭羊', color: 'bg-[#BAE1FF]', text: 'text-blue-600', desc: '全世界最強的晶片工廠！雖然一張很貴，但我們可以買『碎碎的零股』。', price: 1000 },
    { id: '2881', name: '富邦金', risk: '低', tag: '穩定領紅包', color: 'bg-[#BAFFC9]', text: 'text-green-600', desc: '妳正在用的銀行。它很會賺錢，每年都會發紅包（股息）給妳喔。', price: 75 },
    { id: '3443', name: '創意', risk: '極高', tag: '隱藏黑馬', color: 'bg-[#FFFFBA]', text: 'text-yellow-600', desc: '做 AI 零件的公司。雖然冷門但很有前景，適合想賺大錢的小資女。', price: 1200 },
    { id: '0050', name: '台灣50', risk: '極低', tag: '懶人首選', color: 'bg-[#BAE1FF]', text: 'text-blue-600', desc: '買這支等於買下台灣最強的50家公司，最適合定期定額。', price: 160 },
    { id: '9999', name: '地雷工業', risk: '危險', tag: '必賠避雷', color: 'bg-[#FFB3BA]', text: 'text-red-600', desc: '公司老闆愛亂說話，且連年虧損。看到這顏色，快跑！', price: 10 },
  ];

  // --- 智慧篩選與風險邏輯 ---
  const filteredStocks = stockList.filter(s => {
    if (activeTab === 'danger') return s.tag === '必賠避雷';
    return s.tag !== '必賠避雷';
  });

  // --- AI 提問回覆邏輯 ---
  const askAI = (q) => {
    const responses = {
      '定期定額怎麼改?': '到富邦 App 找『台股定期定額』，點進『變更』就能改每個月投多少錢囉！',
      '什麼是交割?': '簡單說就是『付錢的日子』。買完股票兩天後，戶頭一定要有錢，不然會變壞小孩（違約）。',
      '現在能買嗎?': '看現在是綠燈還是紅燈！綠燈（馬卡龍綠）代表特價中，紅燈就先等等喔。',
      '手續費優惠': '富邦現在定期定額有 1 元優惠！省下的錢可以多喝一杯珍奶。'
    };
    setAiMsg(responses[q] || "這個術語太難了，我用五歲小孩的話幫妳查查...");
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen text-slate-800 font-sans pb-24 shadow-2xl overflow-x-hidden">
      
      {/* 頂部導航：馬卡龍風 */}
      <header className="p-6 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tighter">投資小白 <span className="text-pink-400">♥</span></h1>
          <div className="flex items-center gap-1 mt-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <p className="text-[10px] text-gray-400 font-bold uppercase">秒級實時監控中</p>
          </div>
        </div>
        <button onClick={() => setShowNotification(!showNotification)} className="p-2 bg-gray-50 rounded-2xl relative text-gray-400">
          <Bell size={20} />
          {showNotification && <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full border-2 border-white"></span>}
        </button>
      </header>

      {/* 通知預覽 (智慧免打擾) */}
      {showNotification && (
        <div className="mx-6 mb-4 p-4 bg-[#FFF0F5] border border-pink-100 rounded-2xl animate-bounce-short">
          <p className="text-xs text-pink-600 font-bold flex items-center gap-2">
            <AlertTriangle size={14} /> 發現新狀況！
          </p>
          <p className="text-[11px] text-pink-500 mt-1">有一家新公司上市了，且符合妳的預算，要看看嗎？</p>
        </div>
      )}

      {/* 智慧預算篩選器 */}
      <section className="px-6 py-4">
        <div className="bg-[#FDFCF0] p-6 rounded-[40px] border border-[#F0EAD6] shadow-inner">
          <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest">目前想投的資金 (TWD)</label>
          <div className="flex items-center mt-1">
            <span className="text-2xl font-bold text-gray-300 mr-1">$</span>
            <input 
              type="number" 
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="bg-transparent text-3xl font-black focus:outline-none w-full text-slate-700"
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-2 font-medium">※ 預算較小時，AI 會優先幫妳推薦『零股』投資方案</p>
        </div>
      </section>

      {/* AI 老師提問區 (馬卡龍藍) */}
      <section className="px-6 py-2">
        <div className="bg-[#BAE1FF]/20 p-6 rounded-[40px] relative">
          <div className="flex gap-3">
            <div className="bg-white p-2 rounded-2xl shadow-sm h-fit"><MessageCircle size={20} className="text-blue-400" /></div>
            <div>
              <p className="text-sm font-bold text-blue-800 mb-4">{aiMsg}</p>
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {['定期定額怎麼改?', '什麼是交割?', '手續費優惠'].map(q => (
                  <button key={q} onClick={() => askAI(q)} className="whitespace-nowrap bg-white/80 px-4 py-2 rounded-full text-[10px] font-black text-blue-500 shadow-sm hover:bg-blue-500 hover:text-white transition-all">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 分類標籤 */}
      <nav className="flex px-10 mt-8 gap-8">
        <button onClick={() => setActiveTab('recommend')} className={`pb-2 text-sm font-black transition-all ${activeTab === 'recommend' ? 'text-[#88D8B0] border-b-4 border-[#88D8B0]' : 'text-gray-200'}`}>
          適合我的
        </button>
        <button onClick={() => setActiveTab('danger')} className={`pb-2 text-sm font-black transition-all ${activeTab === 'danger' ? 'text-[#FFB3BA] border-b-4 border-[#FFB3BA]' : 'text-gray-200'}`}>
          必賠避雷
        </button>
      </nav>

      {/* 股票投資卡片清單 */}
      <main className="px-6 py-4 space-y-6">
        {filteredStocks.map(stock => (
          <div key={stock.id} className="bg-white border border-gray-50 p-6 rounded-[40px] shadow-sm hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-12 rounded-full ${stock.color} opacity-80`}></div>
                <div>
                  <h3 className="font-black text-xl text-slate-800">{stock.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[10px] bg-gray-100 text-gray-400 px-2 py-0.5 rounded-md font-bold uppercase">代號 {stock.id}</span>
                    <span className={`text-[10px] font-black ${stock.risk === '危險' ? 'text-red-400' : 'text-green-400'}`}>風險：{stock.risk}</span>
                  </div>
                </div>
              </div>
              <span className={`${stock.color} ${stock.text} text-[10px] px-4 py-1.5 rounded-full font-black shadow-sm`}>
                {stock.tag}
              </span>
            </div>
            
            <p className="mt-5 text-xs text-gray-500 leading-relaxed font-medium">“ {stock.desc} ”</p>
            
            <div className="mt-6 pt-5 border-t border-gray-50 flex justify-between items-center">
              <div className="flex -space-x-3">
                {[1,2,3].map(i => <div key={i} className={`w-7 h-7 rounded-full border-4 border-white ${stock.color} opacity-40`}></div>)}
              </div>
              <button className="text-[10px] font-black text-gray-400 hover:text-slate-800 flex items-center gap-1 transition-colors">
                查看分析 <TrendingUp size={14} />
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* 底部導航欄 */}
      <div className="fixed bottom-0 w-full max-w-md bg-white/90 backdrop-blur-xl border-t border-gray-50 p-6 flex justify-around items-center rounded-t-[40px] shadow-2xl">
        <TrendingUp className="text-[#88D8B0] cursor-pointer" size={26} />
        <Search className="text-gray-200 cursor-pointer" size={26} />
        <Heart className="text-[#FFB3BA] cursor-pointer" size={26} />
        <BookOpen className="text-[#BAE1FF] cursor-pointer" size={26} />
      </div>
    </div>
  );
}
