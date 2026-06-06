(function () {
  "use strict";
  window.__BRAND__ = {
    name: "Las Reliquias del Multinivel",
    tagline: "Conocimiento. Transformación. Libertad.",
    event: {
      date: "Sábado 27 de junio",
      // Target for countdown — Sat Jun 27 2026, 08:00 CDMX (UTC-6) => 14:00 UTC
      targetISO: "2026-06-27T14:00:00-06:00",
      // Seats bar
      seatsBase: 78, seatsPerDay: 3, seatsCap: 96, seatsBaseDate: "2026-06-06"
    },

    brands: [
      "Herbalife", "doTERRA", "Mary Kay", "Nu Skin", "Amway", "Forever Living",
      "Young Living", "Omnilife", "4Life", "Isagenix", "USANA", "Arbonne",
      "Monat", "Oriflame", "Jeunesse", "Avon", "Tupperware", "Inmunotec",
      "Fuxion", "Natura", "Plexus", "Modere", "Vorwerk", "Belcorp"
    ],

    // WhatsApp-style testimonials (simulated chat captures)
    testimonials: [
      { name: "María G.", initial: "M", color: "#7B2FFF", msgs: [
        { t:"Apliqué lo de la IA y cerré 3 personas esta semana 🔥", me:false },
        { t:"Increíble María!! Eso es ejecutar 👏", me:true },
        { t:"Nunca había prospectado tan fácil, gracias!!", me:false } ], result:"3 cierres en 1 semana" },
      { name: "Carlos R.", initial: "C", color: "#FF2D8E", msgs: [
        { t:"Llevaba meses estancado en $300… este mes hice $1,900", me:false },
        { t:"Vamoooos Carlos 🚀", me:true } ], result:"De $300 a $1,900/mes" },
      { name: "Gloria P.", initial: "G", color: "#2233FF", msgs: [
        { t:"Mi equipo pasó de 4 a 14 personas en 6 semanas", me:false },
        { t:"El sistema duplica solo cuando todos lo siguen 💪", me:true },
        { t:"Exacto! ahora sí entiendo la duplicación", me:false } ], result:"De 4 a 14 socios" },
      { name: "Andrés F.", initial: "A", color: "#9D5BFF", msgs: [
        { t:"La IA de ventas me salvó, practico objeciones a las 11pm 😅", me:false },
        { t:"Jaja es como tener un coach 24/7", me:true } ], result:"Cierra con confianza" },
      { name: "Daniela M.", initial: "D", color: "#E8186F", msgs: [
        { t:"Por fin la gente me busca a mí, no al revés", me:false },
        { t:"Eso es marca personal bien hecha ✨", me:true } ], result:"Prospectos entrantes" },
      { name: "Jorge S.", initial: "J", color: "#7B2FFF", msgs: [
        { t:"80% de mis cierres ya son por redes 🤯", me:false },
        { t:"El multinivel moderno funciona distinto 🔥", me:true } ], result:"80% cierres online" },
      { name: "Karen D.", initial: "K", color: "#FF2D8E", msgs: [
        { t:"Hice mi primer rango después de 2 años 😭🏆", me:false },
        { t:"TE LO MERECES 🎉🎉", me:true } ], result:"Primer rango alcanzado" },
      { name: "Roberto V.", initial: "R", color: "#2233FF", msgs: [
        { t:"El roleplay del sábado me cambió la cabeza", me:false },
        { t:"La práctica mata el miedo hermano 💪", me:true } ], result:"Presenta sin miedo" }
    ],

    // Mentores — arte de arquetipo + foto real (cuando exista)
    mentores: [
      { name:"Jimmy",   title:"El Mago",        arch:"assets/img/mentor-mago.jpg",       photo:"assets/img/foto-jimmy.jpg" },
      { name:"Raúl T.", title:"El Mentalista",  arch:"assets/img/mentor-mentalista.jpg", photo:"assets/img/foto-raul.jpg" },
      { name:"Jaime",   title:"El Capitán",     arch:"assets/img/mentor-capitan.jpg",    photo:null },
      { name:"Raúl V.", title:"El Alquimista",  arch:"assets/img/mentor-alquimista.jpg", photo:null },
      { name:"Daniela", title:"La Arquitecta",  arch:"assets/img/mentor-arquitecta.jpg", photo:null }
    ],

    // Horarios — dos espacios (8–10 AM y 2–4 PM CDMX) traducidos por país
    timezones: [
      { cc:"mx", country:"México (CDMX)",     s1:"8:00 AM",  s2:"2:00 PM" },
      { cc:"co", country:"Colombia",           s1:"9:00 AM",  s2:"3:00 PM" },
      { cc:"pe", country:"Perú",               s1:"9:00 AM",  s2:"3:00 PM" },
      { cc:"ec", country:"Ecuador",            s1:"9:00 AM",  s2:"3:00 PM" },
      { cc:"cl", country:"Chile",              s1:"10:00 AM", s2:"4:00 PM" },
      { cc:"ar", country:"Argentina",          s1:"11:00 AM", s2:"5:00 PM" },
      { cc:"us", country:"USA (Miami)",        s1:"10:00 AM", s2:"4:00 PM" },
      { cc:"es", country:"España",             s1:"4:00 PM",  s2:"10:00 PM" },
      { cc:"do", country:"Rep. Dominicana",    s1:"10:00 AM", s2:"4:00 PM" }
    ],

    faqs: [
      { q:"¿El webinar tiene algún costo?",
        a:"El registro es 100% gratuito. El Acceso VIP de $10 es opcional: solo lo eliges si quieres los extras (grabación de por vida, workbook, plantillas, comunidad VIP, sorteos y más)." },
      { q:"¿Sirve si estoy en cualquier compañía de multinivel?",
        a:"Sí. Las 3 reliquias son sistemas universales de prospección con IA, ventas y estrategia digital. Funcionan sin importar tu empresa, producto o nivel actual." },
      { q:"¿Necesito experiencia previa o saber de tecnología?",
        a:"No. Te llevamos paso a paso. Si sabes usar WhatsApp y redes sociales, tienes todo lo necesario para aplicar lo que verás ese día." },
      { q:"¿Hay más de un horario?",
        a:"Sí. El sábado 27 de junio tendremos dos espacios: de 8:00 a 10:00 AM y de 2:00 a 4:00 PM (hora CDMX). Eliges el que mejor te quede al registrarte." },
      { q:"¿Y si no puedo conectarme en vivo?",
        a:"Con el Acceso VIP obtienes la grabación del evento con acceso de por vida. El registro gratuito es solo en vivo." },
      { q:"¿Esto es para reclutarme a una empresa?",
        a:"No. Es formación pura. No te invitamos a ninguna compañía ni a cambiar de red. Vienes a aprender sistemas que apliques en el negocio que ya tienes." }
    ]
  };
})();
