"use client";
import { useState } from "react";
import { Calendar, User, Phone, Scissors, MessageCircle, Check } from "lucide-react";

// 1. Tipagem adicionada para o TypeScript aprovar o build
interface Servico {
  id: number;
  nome: string;
  preco: number;
}

export default function Home() {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  
  // 2. Avisando ao Next.js que o ID começa nulo, mas será um número
  const [servicoId, setServicoId] = useState<number | null>(null);
  const [sobrancelha, setSobrancelha] = useState(false);

  // 3. Tipando a lista de serviços
  const servicos: Servico[] = [
    { id: 1, nome: "Corte Simples", preco: 50 },
    { id: 2, nome: "Corte Navalhado", preco: 60 },
    { id: 3, nome: "Barba Profissional", preco: 40 },
    { id: 4, nome: "Combo: Corte + Barba", preco: 90 },
  ];

  const listaHorarios = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];
  const ocupados = ["10:00", "15:00"]; 

  const servicoAtual = servicos.find(s => s.id === servicoId);
  const total = (servicoAtual?.preco || 0) + (sobrancelha ? 10 : 0);

  const enviarZap = () => {
    if (!servicoAtual) return;

    const msg = `Olá LaJack! Gostaria de agendar:
*Serviço:* ${servicoAtual.nome} ${sobrancelha ? "+ Sobrancelha" : ""}
*Data:* ${data}
*Horário:* ${horario}
*Cliente:* ${nome}
*WhatsApp:* ${whatsapp}
*Total:* R$ ${total},00`;

    const numeroBarbearia = "5511994223786"; 
    const url = `https://wa.me/${numeroBarbearia}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100 pb-40 font-sans antialiased">
      
      <header className="pt-16 pb-10 px-6 text-center">
        <h1 className="text-4xl font-black text-emerald-500 tracking-[0.3em] uppercase">LaJack</h1>
        <div className="flex justify-center items-center gap-2 mt-2">
          <div className="h-[1px] w-8 bg-zinc-800" />
          <p className="text-zinc-500 text-[9px] uppercase tracking-[0.4em]">Barbershop & Design</p>
          <div className="h-[1px] w-8 bg-zinc-800" />
        </div>
      </header>

      <div className="max-w-md mx-auto px-6 space-y-12">

        {/* 01. SERVIÇOS */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-emerald-500">
            <Scissors size={16} />
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-80">Selecione o Serviço</label>
          </div>
          <div className="grid gap-3">
            {servicos.map((s) => (
              <button 
                key={s.id}
                onClick={() => { setServicoId(s.id); setSobrancelha(false); }}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                  servicoId === s.id ? "bg-emerald-500/10 border-emerald-500" : "bg-zinc-900/40 border-zinc-800/50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`font-bold tracking-tight ${servicoId === s.id ? "text-emerald-400" : "text-zinc-300"}`}>{s.nome}</span>
                  <span className="text-emerald-500 font-black text-sm">R$ {s.preco}</span>
                </div>
                {servicoId === s.id && s.nome.includes("Corte") && (
                  <div className="mt-4 pt-4 border-t border-zinc-800/50 flex items-center gap-3" onClick={e => e.stopPropagation()}>
                    <div 
                      onClick={() => setSobrancelha(!sobrancelha)}
                      className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${sobrancelha ? "bg-emerald-500 border-emerald-500" : "border-zinc-700"}`}
                    >
                      {sobrancelha && <Check size={14} className="text-zinc-950" strokeWidth={4} />}
                    </div>
                    <label className="text-xs text-zinc-500 font-medium">Adicionar Sobrancelha (+ R$10)</label>
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* 02. DATA E HORA */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-emerald-500">
            <Calendar size={16} />
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-80">Data e Horário</label>
          </div>
          <div className="space-y-4">
            <input 
              type="date" 
              onChange={e => setData(e.target.value)}
              className="w-full p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 focus:border-emerald-500 outline-none text-zinc-400 text-sm"
            />
            <div className="grid grid-cols-4 gap-2">
              {listaHorarios
                .filter(h => !ocupados.includes(h))
                .map(h => (
                  <button
                    key={h}
                    onClick={() => setHorario(h)}
                    className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                      horario === h ? "bg-emerald-500 border-emerald-500 text-zinc-950" : "bg-zinc-900/20 border-zinc-800/50 text-zinc-500"
                    }`}
                  >
                    {h}
                  </button>
                ))
              }
            </div>
          </div>
        </section>

        {/* 03. IDENTIFICAÇÃO */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-emerald-500">
            <User size={16} />
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-80">Seus Contatos</label>
          </div>
          <div className="space-y-3">
            <div className="relative">
              <User size={14} className="absolute left-5 top-6 text-zinc-700" />
              <input 
                type="text" placeholder="Nome Completo"
                value={nome}
                onChange={e => setNome(e.target.value)}
                className="w-full p-5 pl-12 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 focus:border-emerald-500 outline-none text-sm"
              />
            </div>
            <div className="relative">
              <Phone size={14} className="absolute left-5 top-6 text-zinc-700" />
              <input 
                type="tel" placeholder="WhatsApp"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                className="w-full p-5 pl-12 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 focus:border-emerald-500 outline-none text-sm"
              />
            </div>
          </div>
        </section>
      </div>

      <a 
        href="https://wa.me/5511994223786" 
        target="_blank"
        className="fixed bottom-32 right-6 p-4 bg-zinc-900 border border-zinc-800 text-emerald-500 rounded-full shadow-2xl active:scale-90 transition-all z-20"
      >
        <MessageCircle size={24} />
      </a>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent z-10">
        <button 
          onClick={enviarZap}
          disabled={!servicoId || !data || !horario || !nome || !whatsapp}
          className="w-full max-w-md mx-auto block py-5 bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-950 font-black uppercase tracking-[0.1em] rounded-3xl shadow-lg active:scale-95 transition-all"
        >
          {total > 0 ? `Reservar • R$ ${total},00` : "Preencha os dados"}
        </button>
      </div>
    </main>
  );
}