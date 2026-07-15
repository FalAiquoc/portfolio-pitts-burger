import { useEffect, useState } from 'react';
import { storeData } from './data';
import { Icon } from './components/Icon';

// Componente de Logotipo Vetorial Personalizado (Hambúrguer retrô estilizado com chamas de grelha e anel clássico neon)
function Logo({ className = "h-10", dark = false }: { className?: string; dark?: boolean }) {
  const primaryColor = '#dc2626'; // Vermelho Pitts
  const accentColor = '#fbbf24';  // Amarelo Mostarda
  const textColor = dark ? '#0F172A' : '#FFFFFF';

  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      <svg className="h-full aspect-square overflow-visible" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke={primaryColor} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
          {/* Hambúrguer - pão superior, carne, pão inferior */}
          <path d="M 40 90 Q 100 40 160 90 Z" fill={accentColor} strokeWidth="12" />
          <path d="M 30 110 L 170 110" stroke={primaryColor} strokeWidth="18" />
          <path d="M 50 130 C 50 150 150 150 150 130 Z" fill={accentColor} strokeWidth="12" />
          {/* Chamas na grelha sob o burger */}
          <path d="M 60 170 Q 70 150 80 170 Q 90 150 100 170 Q 110 150 120 170" stroke={primaryColor} strokeWidth="8" />
        </g>
      </svg>
      <div className="flex flex-col leading-[0.9] text-left font-display">
        <span className="text-2xl font-black tracking-tighter uppercase" style={{ color: textColor }}>PITTS</span>
        <span className="text-[15px] font-black tracking-[0.2em]" style={{ color: accentColor }}>BURGER</span>
        <span className="text-[8px] font-bold tracking-[0.1em] text-slate-400">Desde 1984 em Natal</span>
      </div>
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Estados do Montador de Hambúrguer
  const [bread, setBread] = useState<string>('Brioche');
  const [meatType, setMeatType] = useState<string>('Blerd Blend 180g');
  const [cheese, setCheese] = useState<string>('Cheddar Maçaricado');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const breadPrice = 4.00;
  const meatPrice = 18.00;
  const cheesePrice = 6.00;
  
  const extrasPrices: Record<string, number> = {
    'Bacon Defumado': 5.00,
    'Cebola Caramelizada': 3.50,
    'Molho Especial': 2.00,
    'Ovo Frito': 3.00
  };

  // Cálculo do preço do burger customizado
  const calculateBurgerTotal = () => {
    let total = breadPrice + meatPrice + cheesePrice;
    selectedExtras.forEach(extra => {
      total += extrasPrices[extra] || 0;
    });
    return total;
  };

  const handleToggleExtra = (extra: string) => {
    if (selectedExtras.includes(extra)) {
      setSelectedExtras(selectedExtras.filter(item => item !== extra));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  // Injeção de fontes e cores
  useEffect(() => {
    if (storeData.typography.importUrl) {
      const linkId = 'store-google-fonts';
      let fontLink = document.getElementById(linkId) as HTMLLinkElement;
      if (!fontLink) {
        fontLink = document.createElement('link');
        fontLink.id = linkId;
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
      }
      fontLink.href = storeData.typography.importUrl;
    }

    const root = document.documentElement;
    root.style.setProperty('--font-display-family', storeData.typography.displayFontFamily);
    root.style.setProperty('--font-body-family', storeData.typography.bodyFontFamily);

    // Cores do Pitts Burger
    root.style.setProperty('--p-50', '#fffbeb');
    root.style.setProperty('--p-100', '#fef3c7');
    root.style.setProperty('--p-500', storeData.colors.primaryHex); // Vermelho
    root.style.setProperty('--p-600', '#b91c1c');
    root.style.setProperty('--p-700', '#991b1b');
    root.style.setProperty('--p-800', '#7f1d1d');

    root.style.setProperty('--a-50', `${storeData.colors.accentHex}10`);
    root.style.setProperty('--a-100', `${storeData.colors.accentHex}20`);
    root.style.setProperty('--a-500', storeData.colors.accentHex); // Amarelo Mostarda

    document.title = `${storeData.name} — Hambúrgueres Grelhados no Fogo desde 1984`;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getWhatsAppLink = (msg?: string) => {
    const defaultMsg = msg || storeData.whatsappMessage;
    return `https://api.whatsapp.com/send?phone=${storeData.whatsappNumber}&text=${encodeURIComponent(defaultMsg)}`;
  };

  const getCustomBurgerOrderLink = () => {
    const text = `Olá! Montei meu Hambúrguer Customizado no site:\n- Pão: ${bread}\n- Blend: ${meatType}\n- Queijo: ${cheese}\n- Adicionais: ${selectedExtras.join(', ') || 'Nenhum'}\n- Valor Estimado: R$ ${calculateBurgerTotal().toFixed(2)}\nFavor confirmar o pedido.`;
    return getWhatsAppLink(text);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-slate-200 antialiased selection:bg-red-500 selection:text-white">
      
      {/* LETREIRO MARQUEE DESLIZANTE DE INFORMAÇÕES DE DELIVERY */}
      <div className="bg-[#dc2626] text-white text-[10px] font-black uppercase tracking-widest py-2.5 overflow-hidden relative z-50 border-b border-white/10">
        <div className="whitespace-nowrap flex space-x-12 animate-marquee">
          <span>🍔 DESDE 1984 SERVINDO O HAMBÚRGUER ARTESANAL GRELHADO MAIS QUERIDO DE NATAL!</span>
          <span>🍟 PEÇA COMBO COM BATATA FRITA + BEBIDA E GANHE 15% DE DESCONTO NO DELIVERY!</span>
          <span>🛵 ENTREGA GRÁTIS EM LAGOA NOVA E TIROL PARA COMPRAS ACIMA DE R$ 50!</span>
          <span>🍔 DESDE 1984 SERVINDO O HAMBÚRGUER ARTESANAL GRELHADO MAIS QUERIDO DE NATAL!</span>
        </div>
      </div>

      {/* TOPBAR */}
      <div className="bg-stone-900 text-stone-400 text-xs py-2 border-b border-stone-850 relative z-50 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5"><Icon name="Phone" size={13} className="text-[#fbbf24]" /> (84) 4008-4000</span>
            <span className="flex items-center gap-1.5"><Icon name="Flame" size={13} className="text-[#fbbf24]" /> Grelhado no Fogo</span>
            <a href="#localizacao" className="hover:text-white flex items-center gap-1.5 transition-colors"><Icon name="MapPin" size={13} className="text-[#fbbf24]" /> Lagoa Nova, Natal</a>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#monte-seu-pitts" className="hover:text-white transition-colors font-bold text-amber-50">Customizar Burguer</a>
            <div className="flex items-center space-x-3 pl-3 border-l border-stone-700">
              {storeData.instagramUrl && <a href={storeData.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Icon name="Instagram" size={14} /></a>}
              {storeData.facebookUrl && <a href={storeData.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Icon name="Facebook" size={14} /></a>}
            </div>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className={`fixed top-0 sm:top-18 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#0F0F0F] shadow-lg py-2 border-b border-red-500/25' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <a href="#hero" className="flex items-center transition-transform hover:scale-101 shrink-0">
              <Logo className="h-10 sm:h-11" />
            </a>
            
            <nav className="hidden lg:flex items-center space-x-8 text-xs font-black uppercase tracking-wider text-slate-250">
              <a href="#monte-seu-pitts" className="hover:text-[#fbbf24] transition-colors">Monte seu Burger</a>
              <a href="#produtos" className="hover:text-[#fbbf24] transition-colors">Cardápio</a>
              <a href="#sobre" className="hover:text-[#fbbf24] transition-colors">História</a>
              <a href="#localizacao" className="hover:text-[#fbbf24] transition-colors">Localização</a>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-[#0F0F0F] bg-[#fbbf24] hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20">
                <Icon name="Phone" className="mr-2" size={14} /> Delivery WhatsApp
              </a>
            </nav>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-[#fbbf24] hover:bg-stone-900 transition-colors">
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-stone-900 border-t border-stone-850 px-4 pt-4 pb-6 space-y-4 shadow-2xl text-slate-300 text-sm font-semibold">
            <a href="#monte-seu-pitts" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-stone-800 hover:text-[#fbbf24]">🍔 Customizar Burguer</a>
            <a href="#produtos" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-stone-800 hover:text-[#fbbf24]">🍟 Cardápio do Dia</a>
            <a href="#sobre" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-stone-800 hover:text-[#fbbf24]">🏢 Nossa História</a>
            <a href="#localizacao" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 border-b border-stone-800 hover:text-[#fbbf24]">📍 Onde Estamos</a>
            
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center py-3 text-xs font-bold uppercase tracking-widest text-[#0F0F0F] bg-[#fbbf24] hover:bg-amber-400">
              <Icon name="Phone" className="mr-2" size={16} /> WhatsApp Fazer Pedido
            </a>
          </div>
        )}
      </header>

      {/* HERO SECTION - American Diner Retro style */}
      <section id="hero" className="relative pt-36 pb-24 md:pt-56 md:pb-36 bg-[#161616] overflow-hidden border-b-4 border-[#dc2626]">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/12 w-[400px] h-[400px] rounded-full bg-[#dc2626] filter blur-[140px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/12 w-[550px] h-[550px] rounded-full bg-[#fbbf24] filter blur-[160px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#dc262603_1px,transparent_1px),linear-gradient(to_bottom,#dc262603_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-1.5 text-xs font-black tracking-widest uppercase border border-[#dc2626]/50 bg-[#dc2626]/10 text-red-400">
                🔥 HAMBÚRGUER GRELHADO DE VERDADE DESDE 1984
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black tracking-tight leading-[0.93] text-white uppercase">
                Fogo de verdade, <br />
                <span className="text-[#fbbf24] italic font-light lowercase">sabor absoluto.</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-350 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {storeData.description} Deliciosos blends bovinos Angus grelhados no fogo, queijo cheddar maçaricado na hora e o lendário molho Pitts.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-xs font-black uppercase tracking-wider text-[#0F0F0F] bg-[#fbbf24] hover:bg-amber-400 transition-all shadow-lg hover:shadow-amber-500/30">
                  <Icon name="Phone" className="mr-2" size={16} /> Fazer Pedido no Delivery
                </a>
                <a href="#monte-seu-pitts" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-xs font-black uppercase tracking-wider text-white border border-slate-700 hover:border-[#fbbf24] hover:bg-white/5 transition-all">
                  <Icon name="Flame" className="mr-2" size={16} /> Customizar Meu Burguer
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-4 border border-[#dc2626]/40 transform translate-x-3 translate-y-3 pointer-events-none"></div>
                <div className="relative bg-[#1c1c1c] p-3 border border-slate-800 shadow-2xl">
                  <img 
                    src={storeData.aboutImage} 
                    alt="Hambúrguer artesanal Angus Pitts Burger" 
                    className="w-full h-[400px] object-cover filter brightness-[0.9] grayscale-[10%]" 
                  />
                  <div className="absolute bottom-6 left-6 bg-[#0F0F0F]/95 backdrop-blur-sm border-l-4 border-[#dc2626] text-white p-4">
                    <p className="text-[10px] uppercase tracking-widest text-[#fbbf24] font-black">100% Carne Angus</p>
                    <p className="text-xs text-stone-300 font-light mt-0.5">Moída diariamente na lanchonete</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MARCAS PARCEIRAS / LABS */}
      <section className="py-10 bg-stone-950 border-y border-stone-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-[10px] tracking-widest uppercase text-slate-500 font-bold mb-6">Qualidade declarada dos ingredientes</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 items-center justify-items-center opacity-85">
            {storeData.brands?.map((brand, idx) => (
              <div key={idx} className="text-center group pointer-events-none">
                <span className="font-display text-base sm:text-lg tracking-wider text-slate-350 font-semibold italic border-b border-red-500/20 pb-1 group-hover:text-[#fbbf24] transition-colors">
                  {brand.name}
                </span>
                <span className="block text-[8px] text-slate-500 uppercase tracking-widest mt-1">{brand.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS DA LANCHONETE */}
      <section className="py-8 bg-stone-900 border-b border-stone-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-red-500/10 text-[#dc2626] rounded-none border border-red-500/20">
                <Icon name="Flame" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Fogo de Grelha</h4>
              <p className="text-[10px] text-stone-400">Sabor defumado único proporcionado por nossa grelha industrial.</p>
            </div>
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-red-500/10 text-[#dc2626] rounded-none border border-red-500/20">
                <Icon name="Timer" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Fast Delivery</h4>
              <p className="text-[10px] text-stone-400">Entrega quente em até 30 minutos em Lagoa Nova.</p>
            </div>
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-red-500/10 text-[#dc2626] rounded-none border border-red-500/20">
                <Icon name="Utensils" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Molho Secreto</h4>
              <p className="text-[10px] text-stone-400">A clássica receita Pitts desenvolvida e guardada desde 1984.</p>
            </div>
            
            <div className="space-y-2 flex flex-col items-center">
              <span className="p-3 bg-red-500/10 text-[#dc2626] rounded-none border border-red-500/20">
                <Icon name="Smile" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Matriz Climatizada</h4>
              <p className="text-[10px] text-stone-400">Espaço confortável para reunir família e amigos em Natal.</p>
            </div>

            <div className="space-y-2 flex flex-col items-center col-span-2 md:col-span-1">
              <span className="p-3 bg-red-500/10 text-[#dc2626] rounded-none border border-red-500/20">
                <Icon name="ShieldCheck" size={22} />
              </span>
              <h4 className="font-display font-black text-xs uppercase tracking-wider">Higiene Absoluta</h4>
              <p className="text-[10px] text-stone-400">Inspeções rigorosas de controle de qualidade na cozinha.</p>
            </div>

          </div>
        </div>
      </section>

      {/* MONTE SEU BURGER / CONSTRUTOR INTERATIVO */}
      <section id="monte-seu-pitts" className="py-24 bg-[#111111] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#dc2626]">Chef de Cozinha</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase">
              Monte o seu <span className="text-[#fbbf24] italic font-light lowercase">Hambúrguer</span>
            </h2>
            <div className="w-16 h-1 bg-[#dc2626] mx-auto"></div>
            <p className="text-slate-400 text-sm sm:text-base font-light max-w-2xl mx-auto">
              Simule a combinação dos seus ingredientes prediletos e peça o seu lanche customizado diretamente no WhatsApp.
            </p>
          </div>

          <div className="bg-[#1c1c1c] border border-slate-800 rounded-none p-8 lg:p-12 shadow-sm max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              <div className="space-y-6">
                <h3 className="text-base font-display font-black text-white uppercase tracking-wider border-b border-slate-800 pb-3">Escolha os Ingredientes</h3>
                
                {/* Tipo de Pão */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-400 uppercase">Tipo de Pão (R$ 4,00):</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Brioche', 'Australiano'].map((p) => (
                      <button
                        key={p}
                        onClick={() => setBread(p)}
                        className={`py-3.5 text-xs font-bold uppercase tracking-wider transition-all border ${
                          bread === p
                            ? 'bg-[#dc2626] text-white border-[#dc2626] shadow-lg'
                            : 'bg-[#111] text-slate-350 border-slate-800 hover:border-[#dc2626]'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Blend de Carne */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-400 uppercase">Blend de Carne (R$ 18,00):</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Blerd Blend 180g', 'Frango Crocante'].map((m) => (
                      <button
                        key={m}
                        onClick={() => setMeatType(m)}
                        className={`py-3.5 text-xs font-bold uppercase tracking-wider transition-all border ${
                          meatType === m
                            ? 'bg-[#dc2626] text-white border-[#dc2626] shadow-lg'
                            : 'bg-[#111] text-slate-355 border-slate-800 hover:border-[#dc2626]'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Queijo */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-400 uppercase">Queijo (R$ 6,00):</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Cheddar Maçaricado', 'Mussarela de Búfala'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setCheese(c)}
                        className={`py-3.5 text-xs font-bold uppercase tracking-wider transition-all border ${
                          cheese === c
                            ? 'bg-[#dc2626] text-white border-[#dc2626] shadow-lg'
                            : 'bg-[#111] text-slate-355 border-slate-800 hover:border-[#dc2626]'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Adicionais Extras */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-400 uppercase">Adicionais Extras:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.keys(extrasPrices).map((extra) => (
                      <button
                        key={extra}
                        onClick={() => handleToggleExtra(extra)}
                        className={`py-3 px-4 text-[10px] font-bold uppercase tracking-wider transition-all border flex items-center justify-between ${
                          selectedExtras.includes(extra)
                            ? 'bg-[#dc2626] text-white border-[#dc2626]'
                            : 'bg-[#111] text-slate-350 border-slate-800 hover:border-[#dc2626]'
                        }`}
                      >
                        <span>{extra}</span>
                        <span className="text-[9px] text-[#fbbf24] bg-yellow-500/5 px-2 py-0.5 border border-yellow-500/10">
                          +R$ {extrasPrices[extra]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-[#111] p-8 rounded-none border border-slate-800 shadow-xl min-h-[300px] flex flex-col justify-center space-y-6 text-center">
                <div className="p-3 bg-red-500/10 rounded-none inline-block text-[#dc2626] border border-red-500/25 mx-auto animate-pulse">
                  <Icon name="Flame" size={28} />
                </div>
                <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Preço Estimado do Lanche</h4>
                
                <div className="space-y-1">
                  <p className="text-xs text-slate-550">Total Simulado:</p>
                  <p className="text-4xl font-extrabold text-[#fbbf24]">R$ {calculateBurgerTotal().toFixed(2)}</p>
                </div>
                
                <div className="bg-[#1c1c1c] p-3 rounded-none border border-slate-800 text-xs text-slate-300">
                  {bread} + {meatType} + {cheese}
                </div>
                
                <div className="pt-2">
                  <a 
                    href={getCustomBurgerOrderLink()} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#fbbf24] hover:text-amber-400"
                  >
                    Enviar Pedido no WhatsApp <Icon name="ChevronRight" className="ml-1" size={16} />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* VITRINE DE PRODUTOS / CARDÁPIO */}
      <section id="produtos" className="py-24 bg-[#161616]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#dc2626]">Menu Clássico</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase">
              Nosso <span className="text-[#fbbf24] italic font-light lowercase">Cardápio do Chef</span>
            </h2>
            <div className="w-16 h-1 bg-[#dc2626] mx-auto"></div>
            <p className="text-slate-400 text-sm sm:text-base font-light">
              Escolha seu hambúrguer artesanal ou combo especial e peça pelo WhatsApp para entrega expressa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storeData.products.map((product) => (
              <div key={product.id} className="bg-[#1c1c1c] border border-slate-800 rounded-none overflow-hidden flex flex-col group hover:shadow-2xl hover:border-red-500/40 transition-all duration-300 relative">
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-[#dc2626] text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-none z-20 shadow-md">
                    {product.tag}
                  </span>
                )}
                
                <div className="relative h-80 overflow-hidden bg-stone-900 border-b border-slate-800">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-[0.85]" loading="lazy" />
                  <div className="absolute inset-0 bg-[#dc2626]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                    <span className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0F0F0F] bg-[#fbbf24] border border-slate-950">Pedir pelo WhatsApp</span>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-display font-extrabold text-white uppercase tracking-wide line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 font-light">{product.description}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-black text-[#fbbf24] bg-yellow-500/5 border border-yellow-500/20 px-3 py-1">{product.price}</span>
                    <a href={getWhatsAppLink(`Olá, gostaria de pedir o item do cardápio: ${product.name} (${product.price}).`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#0F0F0F] bg-[#fbbf24] hover:bg-amber-400 transition-all border border-[#fbbf24]">
                      Comprar <Icon name="ChevronRight" className="ml-1" size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO: SOBRE NÓS E MATRIZ (WOW Factor) */}
      <section id="sobre" className="py-24 bg-[#0F0F0F] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-sm">
                <div className="absolute -inset-3 border-2 border-[#dc2626]/20 transform -translate-x-2 translate-y-2 pointer-events-none"></div>
                <div className="relative bg-slate-900 p-2 shadow-2xl">
                  <img 
                    src={storeData.aboutImage} 
                    alt="Salão retrô americano e cozinha industrial Pitts Burger" 
                    className="w-full h-96 object-cover filter brightness-[0.85] grayscale-[10%]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2 text-center lg:text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-[#dc2626] bg-[#dc2626]/10 px-3 py-1 border border-[#dc2626]/20">Nossa Tradição Gastronômica</span>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-white leading-tight uppercase">
                  O mesmo sabor de Natal <span className="text-[#fbbf24] italic font-light lowercase">desde 1984</span>
                </h2>
              </div>
              
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-light text-center lg:text-left">
                {storeData.aboutText}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-4 p-5 bg-[#1c1c1c] border border-slate-800">
                  <span className="p-3 bg-[#dc2626] text-white rounded-none">
                    <Icon name="Flame" size={24} />
                  </span>
                  <div>
                    <h4 className="font-display font-black text-white text-sm uppercase tracking-wide">Fogo de Grelha</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Preparamos nossos blends bovinos na brasa para garantir o melhor sabor defumado.</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-5 bg-[#1c1c1c] border border-slate-800">
                  <span className="p-3 bg-[#dc2626] text-white rounded-none">
                    <Icon name="Smile" size={24} />
                  </span>
                  <div>
                    <h4 className="font-display font-black text-white text-sm uppercase tracking-wide">Área Climatizada</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Dispomos de área kids interna climatizada e estacionamento privativo grátis.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO: DEPOIMENTOS DE CLIENTES FAMILIARES */}
      <section className="py-24 bg-[#161616] border-t border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#dc2626]">Histórias de Sabor</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase">
              Quem come, <span className="text-[#fbbf24] italic font-light lowercase">recomenda</span>
            </h2>
            <div className="w-16 h-1 bg-[#dc2626] mx-auto"></div>
            <p className="text-slate-400 text-sm sm:text-base font-light">
              O depoimento de quem cresceu comendo o melhor hambúrguer grelhado de Natal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-[#0F0F0F] p-8 border border-slate-800 relative">
              <div className="flex items-center space-x-1 text-[#fbbf24] mb-4">
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
              </div>
              <p className="text-slate-400 text-xs leading-relaxed italic mb-6">
                "Pitts Salada é incomparável. Como esse hambúrguer desde a minha infância em Natal. O molho especial secreto deles continua perfeito e intocável até hoje."
              </p>
              <div className="flex items-center space-x-3">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="Gustavo Varela" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-display font-black text-white text-xs uppercase tracking-wider">Gustavo Varela</h4>
                  <span className="text-[10px] text-slate-500">Cliente desde 1995</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0F0F0F] p-8 border border-slate-800 relative">
              <div className="flex items-center space-x-1 text-[#fbbf24] mb-4">
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
              </div>
              <p className="text-slate-400 text-xs leading-relaxed italic mb-6">
                "O montador de hambúrguer no site facilitou muito. Customizo meu pão brioche com blend duplo e queijo cheddar maçaricado e peço direto no WhatsApp. Prático!"
              </p>
              <div className="flex items-center space-x-3">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Larissa Mendes" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-display font-black text-white text-xs uppercase tracking-wider">Larissa Mendes</h4>
                  <span className="text-[10px] text-slate-500">Cliente - Lagoa Nova</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0F0F0F] p-8 border border-slate-800 relative">
              <div className="flex items-center space-x-1 text-[#fbbf24] mb-4">
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                <Icon name="Star" size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
              </div>
              <p className="text-slate-400 text-xs leading-relaxed italic mb-6">
                "O milkshake de Ovomaltine deles é delicioso e a batata frita ondulada vem sempre muito sequinha e crocante mesmo no delivery. Entrega rápida de verdade."
              </p>
              <div className="flex items-center space-x-3">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" alt="Mariana Valença" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-display font-black text-white text-xs uppercase tracking-wider">Mariana Valença</h4>
                  <span className="text-[10px] text-slate-500">Membro do Clube Pitts</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ INTERATIVO HAMBURGUERIA */}
      <section className="py-24 bg-white text-slate-900 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#dc2626]">Dúvidas Rápidas</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-950 uppercase">
              Perguntas <span className="text-[#dc2626] italic font-light lowercase">Frequentes</span>
            </h2>
            <div className="w-16 h-1 bg-[#dc2626] mx-auto"></div>
            <p className="text-slate-550 text-sm sm:text-base font-light">
              Esclareça dúvidas comuns sobre entrega, reserva para aniversário e blends vegetarianos.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Qual o raio e tempo médio de entrega?",
                a: "Realizamos entregas rápidas nos bairros de Lagoa Nova, Tirol, Petrópolis, Capim Macio e Neópolis. O tempo de entrega médio é de 25 a 35 minutos."
              },
              {
                q: "Qual a gramatura e procedência do blend bovino?",
                a: "Utilizamos carne 100% bovina da raça Angus certificada, moída diariamente sem adição de conservantes ou aditivos químicos. Nossos blends principais pesam 150g ou 120g."
              },
              {
                q: "Posso comemorar aniversário na matriz Lagoa Nova?",
                a: "Sim. Contamos com salão climatizado amplo e área kids. Agende pelo nosso WhatsApp para garantirmos a reserva de mesas conjuntas e benefícios especiais."
              },
              {
                q: "Dispoem de opções vegetarianas ou veganas?",
                a: "Sim. Qualquer hambúrguer de nosso menu pode ser montado substituindo o blend bovino por um blend vegetariano artesanal à base de grão-de-bico com queijo opcional."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 bg-slate-55 hover:bg-slate-100 transition-colors text-left text-slate-950 font-display font-black text-sm uppercase tracking-wide"
                >
                  <span>{faq.q}</span>
                  <Icon
                    name={openFaqIndex === idx ? "Minus" : "Plus"}
                    className="text-[#dc2626]"
                    size={16}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaqIndex === idx ? "max-h-[300px] border-t border-slate-200" : "max-h-0"
                  }`}
                >
                  <p className="p-6 text-xs text-slate-600 leading-relaxed font-light bg-white">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO E CONTATO */}
      <section id="localizacao" className="py-24 bg-[#0F0F0F] border-t border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#dc2626]">Venha nos Visitar</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase">Onde Estamos Localizados</h2>
            <div className="w-16 h-1 bg-[#dc2626] mx-auto"></div>
            <p className="text-slate-400 text-sm sm:text-base font-light">
              Estamos localizados na Avenida Prudente de Morais com amplo estacionamento grátis e rampa de acessibilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            <div className="lg:col-span-5 bg-[#1c1c1c] p-8 rounded-none border border-slate-800 shadow-sm flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <h3 className="text-lg font-display font-black text-white uppercase tracking-wide">Informações de Contato</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-[#0F0F0F] rounded-none text-slate-400">
                      <Icon name="MapPin" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-350 text-xs uppercase tracking-wider">Endereço Matriz</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{storeData.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-[#0F0F0F] rounded-none text-slate-400">
                      <Icon name="Phone" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-350 text-xs uppercase tracking-wider">Central de Delivery</h4>
                      <p className="text-xs text-slate-400 mt-1">{storeData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-[#0F0F0F] rounded-none text-slate-400">
                      <Icon name="Clock" size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-355 text-xs uppercase tracking-wider">Horários de Atendimento</h4>
                      <div className="text-xs text-slate-400 mt-1 space-y-1">
                        <p>{storeData.businessHours.weekdays}</p>
                        <p>{storeData.businessHours.saturday}</p>
                        <p>{storeData.businessHours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-800">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#0F0F0F] bg-[#fbbf24] hover:bg-amber-400 transition-all">
                  <Icon name="Phone" className="mr-2" size={16} /> Chamar no WhatsApp
                </a>
                <a href={storeData.googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-300 bg-[#0F0F0F] border border-slate-800 hover:bg-slate-900 transition-all">
                  <Icon name="MapPin" className="mr-2 text-stone-500" size={16} /> Como Chegar (Google Maps)
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 h-96 lg:h-auto rounded-none overflow-hidden border border-slate-800 bg-[#1c1c1c] p-2">
              <iframe src={storeData.googleMapsEmbedUrl} className="w-full h-full border-0 filter invert-[0.9] hue-rotate-[180deg]" allowFullScreen={false} loading="lazy" title="Localização Pitts Burger"></iframe>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-slate-450 py-16 border-t border-[#dc2626]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Institucional</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#hero" className="hover:text-white transition-colors">Sobre a Hamburgueria</a></li>
                <li><a href="#localizacao" className="hover:text-white transition-colors">Nossa Matriz</a></li>
                <li><a href={getWhatsAppLink('Olá! Gostaria de saber sobre vagas para chapeiros ou atendentes.')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Trabalhe conosco</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Serviços & Menu</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#monte-seu-pitts" className="hover:text-white transition-colors">Customizador de Burgers</a></li>
                <li><a href="#produtos" className="hover:text-white transition-colors">Cardápio do Chef</a></li>
                <li><a href={getWhatsAppLink('Olá! Gostaria de fazer reservas para festa de aniversário.')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Eventos & Festas</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Acompanhe-nos</h4>
              <ul className="space-y-2 text-xs">
                {storeData.instagramUrl && <li><a href={storeData.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center"><Icon name="Instagram" size={13} className="mr-2 text-[#dc2626]" /> Instagram</a></li>}
                {storeData.facebookUrl && <li><a href={storeData.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center"><Icon name="Facebook" size={13} className="mr-2 text-[#dc2626]" /> Facebook</a></li>}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Formas de Pagamento</h4>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold uppercase">
                <span className="bg-stone-900 px-2.5 py-1.5 border border-stone-850 text-center text-stone-300">💳 Crédito</span>
                <span className="bg-stone-900 px-2.5 py-1.5 border border-stone-850 text-center text-slate-300">⚡ Pix</span>
                <span className="bg-stone-900 px-2.5 py-1.5 border border-stone-850 text-center text-slate-300">💵 Dinheiro</span>
                <span className="bg-stone-900 px-2.5 py-1.5 border border-stone-850 text-center text-slate-300">🍿 Vale Refeição</span>
              </div>
            </div>

          </div>

          <div className="border-t border-stone-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left text-xs">
            <div className="space-y-2">
              <Logo className="h-10 mx-auto md:mx-0" />
              <p className="text-[10px] text-stone-500 font-light mt-2">
                © {new Date().getFullYear()} Pitts Burger – Natal. Todos os direitos reservados.
              </p>
            </div>
            
            <div className="text-center md:text-right space-y-2 text-stone-500 text-[9px] uppercase font-bold tracking-wider">
              <p>Pitts Burger Natal - Desde 1984 Potiguar</p>
              <p>Alvará Sanitário de Alimentação: 3.19.294-8 | CNPJ: 08.912.109/0001-92</p>
              <p>
                Desenvolvido por{' '}
                <a href="https://github.com/FalAiquoc" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors text-slate-400">
                  Diogo Falcão (FalAiquoc)
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
