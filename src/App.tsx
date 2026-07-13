import { useEffect, useState } from 'react';
import { storeData } from './data';
import { Icon } from './components/Icon';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
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

    // Cores do Pitts Burger (Vermelho, Laranja, Escuros)
    root.style.setProperty('--p-50', '#fffbeb');
    root.style.setProperty('--p-100', '#fef3c7');
    root.style.setProperty('--p-500', storeData.colors.primaryHex); // Vermelho Pitts
    root.style.setProperty('--p-600', '#b91c1c');
    root.style.setProperty('--p-700', '#991b1b');
    root.style.setProperty('--p-800', '#7f1d1d');

    root.style.setProperty('--a-50', `${storeData.colors.accentHex}10`);
    root.style.setProperty('--a-100', `${storeData.colors.accentHex}20`);
    root.style.setProperty('--a-500', storeData.colors.accentHex); // Laranja Mostarda

    document.title = `${storeData.name} — O Melhor Burger de Natal`;
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

  // Mensagem do Burger customizado montada para o WhatsApp
  const getCustomBurgerOrderLink = () => {
    const text = `Olá! Montei meu Hambúrguer Customizado no site:\n- Pão: ${bread}\n- Blend: ${meatType}\n- Queijo: ${cheese}\n- Adicionais: ${selectedExtras.join(', ') || 'Nenhum'}\n- Valor Estimado: R$ ${calculateBurgerTotal().toFixed(2)}\nFavor confirmar o pedido.`;
    return getWhatsAppLink(text);
  };

  return (
    <div className="min-h-screen bg-[#111] text-amber-50 antialiased selection:bg-red-500 selection:text-white">
      
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#181818]/95 backdrop-blur-md shadow-lg border-b border-red-500/20 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="#hero" className="flex items-center space-x-2">
              <span className="text-3xl font-extrabold tracking-tighter text-red-500 italic uppercase">
                PITTS<span className="text-amber-500 font-bold text-xl ml-1">BURGER</span>
              </span>
            </a>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#monte-seu-pitts" className="text-sm font-semibold uppercase tracking-wider text-amber-100 hover:text-red-500 transition-colors">Monte seu Burger</a>
              <a href="#cardapio" className="text-sm font-semibold uppercase tracking-wider text-amber-100 hover:text-red-500 transition-colors">Cardápio</a>
              <a href="#sobre" className="text-sm font-semibold uppercase tracking-wider text-amber-100 hover:text-red-500 transition-colors">Nossa Casa</a>
              <a href="#localizacao" className="text-sm font-semibold uppercase tracking-wider text-amber-100 hover:text-red-500 transition-colors">Contatos</a>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-2.5 text-sm font-black uppercase text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-full transition-all hover:scale-105 shadow-md shadow-amber-500/10">
                <Icon name="Phone" className="mr-2" size={16} /> Delivery WhatsApp
              </a>
            </nav>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg text-amber-500 hover:bg-[#222] transition-colors">
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-36 pb-24 md:pt-48 md:pb-36 bg-[#181818] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-red-600 filter blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-500 filter blur-[100px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-red-500/30 bg-red-500/10 text-red-400">
                🔥 Grelhado no Fogo de Verdade
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase tracking-tight leading-[1.02]" style={{ fontFamily: 'var(--font-display)' }}>
                O verdadeiro sabor do <span className="text-red-500 italic block">burguer artesanal</span>
              </h1>
              <p className="text-lg text-slate-350 font-light max-w-xl mx-auto lg:mx-0">
                {storeData.description} Blends artesanais frescos de 180g moídos diariamente, cobertos com muito queijo derretido e maçaricado na hora.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-sm font-black uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-full shadow-lg transition-all hover:scale-105">
                  <Icon name="Phone" className="mr-2" size={18} /> Pedir Agora no Delivery
                </a>
                <a href="#monte-seu-pitts" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-sm font-bold uppercase tracking-wider text-white border border-slate-700 hover:border-red-500 hover:bg-red-500/10 rounded-full transition-all">
                  🔥 Customizar Meu Burguer
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-sm">
                <div className="absolute inset-0 rounded-full bg-red-500/10 transform rotate-6 scale-105 filter blur-md"></div>
                <div className="relative bg-[#222] p-4 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800" alt="Hambúrguer Gourmet" className="w-full h-80 object-cover rounded-2xl shadow-inner transition-transform duration-700 hover:scale-105" />
                  <div className="absolute top-8 right-8 bg-red-500 text-white font-bold px-4 py-1.5 rounded-full text-xs shadow-lg uppercase tracking-wider animate-bounce">
                    100% Angus
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MONTE SEU PITTS - INTERATIVO */}
      <section id="monte-seu-pitts" className="py-20 bg-[#141414] border-y border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-white" style={{ fontFamily: 'var(--font-display)' }}>
              Monte o Seu <span className="text-red-500">Pitts Artesanal</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Escolha cada ingrediente do seu hambúrguer e monte a combinação perfeita para matar a sua fome.
            </p>
          </div>

          <div className="bg-[#1c1c1c] rounded-3xl border border-slate-800 p-8 lg:p-12 shadow-2xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Form das opções */}
              <div className="space-y-6 text-left">
                {/* Escolha do Pão */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-amber-500 uppercase tracking-wider">1. Escolha o Pão (R$ 4,00):</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {['Brioche', 'Australiano'].map((p) => (
                      <button
                        key={p}
                        onClick={() => setBread(p)}
                        className={`py-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                          bread === p
                            ? 'bg-red-500 text-white border-red-500 shadow-md'
                            : 'bg-[#262626] text-slate-300 border-slate-800 hover:border-red-500'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Escolha do Blend */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-amber-500 uppercase tracking-wider">2. O Blend de Carne (R$ 18,00):</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {['Blerd Blend 180g', 'Frango Crocante'].map((m) => (
                      <button
                        key={m}
                        onClick={() => setMeatType(m)}
                        className={`py-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                          meatType === m
                            ? 'bg-red-500 text-white border-red-500 shadow-md'
                            : 'bg-[#262626] text-slate-300 border-slate-800 hover:border-red-500'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Escolha do Queijo */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-amber-500 uppercase tracking-wider">3. Escolha o Queijo (R$ 6,00):</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {['Cheddar Maçaricado', 'Mussarela de Búfala'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setCheese(c)}
                        className={`py-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                          cheese === c
                            ? 'bg-red-500 text-white border-red-500 shadow-md'
                            : 'bg-[#262626] text-slate-300 border-slate-800 hover:border-red-500'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Adicionais / Extras */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-amber-500 uppercase tracking-wider">4. Extras / Adicionais:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.keys(extrasPrices).map((extra) => (
                      <button
                        key={extra}
                        type="button"
                        onClick={() => handleToggleExtra(extra)}
                        className={`py-2 px-3 rounded-lg border text-[10px] font-bold uppercase transition-all flex items-center justify-between ${
                          selectedExtras.includes(extra)
                            ? 'bg-red-500 text-white border-red-500'
                            : 'bg-[#262626] text-slate-300 border-slate-800 hover:border-red-500'
                        }`}
                      >
                        <span>{extra}</span>
                        <span className="ml-1 text-slate-400 group-hover:text-white">
                          +R$ {extrasPrices[extra].toFixed(2)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Box de Resumo Visual */}
              <div className="border border-slate-800 bg-[#181818] p-8 rounded-2xl flex flex-col justify-between space-y-6">
                <div className="text-center space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold">Resumo do Pedido</h4>
                  <div className="space-y-2 text-left bg-[#111] p-4 rounded-xl border border-slate-900 text-xs">
                    <p className="text-slate-400">Pão: <strong className="text-white">{bread}</strong></p>
                    <p className="text-slate-400">Carne: <strong className="text-white">{meatType}</strong></p>
                    <p className="text-slate-400">Queijo: <strong className="text-white">{cheese}</strong></p>
                    <p className="text-slate-400">Extras: <strong className="text-white">{selectedExtras.join(', ') || 'Nenhum'}</strong></p>
                  </div>
                  <div className="pt-4 border-t border-slate-800 text-center">
                    <span className="text-slate-400 text-xs block">Valor Total do Burger:</span>
                    <strong className="text-4xl font-extrabold text-amber-500">R$ {calculateBurgerTotal().toFixed(2)}</strong>
                  </div>
                </div>

                <a href={getCustomBurgerOrderLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full py-4 text-xs font-black uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl shadow-lg transition-all hover:scale-102">
                  <Icon name="Phone" className="mr-2" size={16} /> Enviar Pedido no WhatsApp
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CARDÁPIO COMPLETO */}
      <section id="cardapio" className="py-20 bg-[#111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-white" style={{ fontFamily: 'var(--font-display)' }}>
              Nossos <span className="text-red-500">Mais Pedidos</span>
            </h2>
            <p className="text-slate-400 text-lg">Confira a lista de combos de hambúrgueres artesanais montados e prontos da casa.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storeData.products.map((product) => (
              <div key={product.id} className="bg-[#181818] rounded-2xl overflow-hidden border border-slate-850 shadow-md flex flex-col group">
                <div className="relative h-60 overflow-hidden bg-[#222]">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{product.description}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-sm font-extrabold text-amber-500">{product.price}</span>
                    <a href={getWhatsAppLink(`Olá, gostaria de pedir o combo pronto: ${product.name}`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 text-xs font-black uppercase text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-full transition-all">
                      Pedir Combo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOSSA CASA (SOBRE NÓS) */}
      <section id="sobre" className="py-20 bg-[#181818]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-[#111] p-2">
                <img src={storeData.aboutImage} alt="Nossa Cozinha" className="w-full h-[400px] object-cover rounded-xl" />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">Burgers de Verdade</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-white leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                Ingredientes selecionados e <span className="text-amber-500 italic block mt-2">preparo com alma</span>
              </h2>
              <p className="text-slate-350 text-base leading-relaxed font-light">
                {storeData.aboutText}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-[#141414] border border-slate-850">
                  <Icon name="Activity" className="text-red-500" size={24} />
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider">Blend de Qualidade</h4>
                    <p className="text-[10px] text-slate-400">100% carne bovina Angus de primeira linha.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-[#141414] border border-slate-850">
                  <Icon name="Award" className="text-amber-500" size={24} />
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider">Entrega Quentinha</h4>
                    <p className="text-[10px] text-slate-400">Embalagens especiais protetoras térmicas.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO E CONTATO */}
      <section id="localizacao" className="py-20 bg-[#111] border-t border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-white" style={{ fontFamily: 'var(--font-display)' }}>Onde Estamos</h2>
            <p className="text-slate-400 text-lg">Venha nos visitar no coração de Lagoa Nova ou peça no conforto do seu sofá.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 bg-[#181818] p-8 rounded-3xl border border-slate-850 shadow-lg flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500">Informações de Contato</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-[#222] rounded-lg text-slate-400">
                      <Icon name="MapPin" size={18} />
                    </span>
                    <div>
                      <h4 className="font-bold text-white text-xs uppercase tracking-wider">Localização</h4>
                      <p className="text-xs text-slate-400 mt-1">{storeData.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-[#222] rounded-lg text-slate-400">
                      <Icon name="Phone" size={18} />
                    </span>
                    <div>
                      <h4 className="font-bold text-white text-xs uppercase tracking-wider">Telefone</h4>
                      <p className="text-xs text-slate-400 mt-1">{storeData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="p-2 bg-[#222] rounded-lg text-slate-400">
                      <Icon name="Clock" size={18} />
                    </span>
                    <div>
                      <h4 className="font-bold text-white text-xs uppercase tracking-wider">Funcionamento</h4>
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
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-full transition-all shadow-md">
                  <Icon name="Phone" className="mr-2" size={14} /> Chamar no WhatsApp
                </a>
                <a href={storeData.googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#222] hover:bg-[#333] border border-slate-850 rounded-full transition-all">
                  Rotas Google Maps
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 h-96 lg:h-auto rounded-3xl overflow-hidden shadow-md border border-slate-850 bg-[#181818] p-2">
              <iframe src={storeData.googleMapsEmbedUrl} className="w-full h-full rounded-2xl border-0 grayscale-[20%]" allowFullScreen={false} loading="lazy" title="Localização do Pitts Burger"></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0c0c0c] text-slate-500 py-12 border-t border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left space-y-3">
              <span className="text-xl font-extrabold uppercase tracking-tighter text-white" style={{ fontFamily: 'var(--font-display)' }}>
                PITTS<span className="text-red-500 font-normal italic">BURGER</span>
              </span>
              <p className="text-[10px] text-slate-500 max-w-sm mx-auto md:mx-0">
                © {new Date().getFullYear()} Pitts Burger Natal. Todos os direitos reservados.
              </p>
            </div>
            <div className="text-center md:text-right space-y-4">
              <p className="text-[10px] text-slate-500">
                Desenvolvido com carinho por{' '}
                <a href="https://github.com/FalAiquoc" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">
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
