const $ = (id) => document.getElementById(id);
const esc = (s) =>
  s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);
const signo = (n) => (n < 0 ? "−" : "+");
const cuad = (p) =>
  `f(x) = ${p.a}x² ${signo(p.b)} ${Math.abs(p.b)}x ${signo(p.c)} ${Math.abs(p.c)}`;
const fq = (p, x) => p.a * x * x + p.b * x + p.c;
const vert = (p) => {
  if (p.a === 0) return null;
  const xv = -p.b / (2 * p.a);
  return { x: +xv.toFixed(2), y: +fq(p, xv).toFixed(2) };
};
const obsGen = (p) => {
  const v = vert(p);
  return (
    `La curva pasa por (0, ${p.c}). ` +
    (v
      ? `El vértice está en (${v.x}, ${v.y}).`
      : "Con a = 0 ya no es parábola: es una recta.")
  );
};
const P3 = [
  { id: "a", min: -3, max: 3, step: 0.5, val: 1 },
  { id: "b", min: -5, max: 5, step: 0.5, val: 0 },
  { id: "c", min: -8, max: 8, step: 1, val: 0 },
];
const EJ2 =
  "let a = 1;\nlet b = 3;\nlet c = -2;\nlet y = a * x * x + b * x + c;";

/* ===== Curso: 3 niveles, siempre con las 3 etapas de Bruner ===== */
const NIVELES = [
  {
    t: "Nivel 1 · Variables y el término a",
    mate: "y = a·x²",
    prog: "let, =, número, ; y *",
    params: [P3[0]],
    f: (p, x) => p.a * x * x,
    fx: (p) => `f(x) = ${p.a}x²`,
    retos: [{ a: 2 }, { a: -1 }, { a: 0.5 }, { a: -2 }, { a: 1.5 }],
    preg: [
      "¿Qué pasa con la curva cuando a es positivo y cuando es negativo?",
      "¿Qué ocurre si |a| es grande (3) y si es pequeño (0.5)?",
      "¿Qué pasa cuando a vale 0?",
    ],
    obs: (p) =>
      p.a === 0
        ? "Con a = 0 desaparece la curva: queda una línea sobre el eje horizontal."
        : `Con a ${p.a > 0 ? "positivo abre hacia arriba" : "negativo abre hacia abajo"}; el vértice (punto rojo) está en (0, 0).`,
    term: "<b>a</b> controla hacia dónde abre la parábola (arriba si es positivo, abajo si es negativo) y qué tan cerrada es: mientras mayor sea |a|, más cerrada. <b>x·x</b> (x al cuadrado) da la forma de «U». El punto rojo es el <b>vértice</b>: el punto más bajo (o más alto) de la curva.",
    lec: `<ul class="list-disc ml-5 space-y-0.5"><li><code>let</code>: crea una <b>variable</b>, una «caja» con nombre donde se guarda un valor.</li><li><code>a</code>: el <b>nombre</b> de la variable (el mismo de la fórmula).</li><li><code>=</code>: <b>guarda</b> el valor de la derecha en la variable. No significa «igual» como en matemáticas.</li><li><code>1</code>: el <b>valor</b> que se guarda. Es lo que cambiarás hoy.</li><li><code>;</code>: marca el final de la instrucción.</li><li><code>*</code>: <b>multiplica</b>. Por eso x² se escribe <code>x * x</code>.</li><li><code>y</code> es el resultado de la función y <code>x</code> cada valor que el computador prueba.</li><li><code>//</code>: un <b>comentario</b>; el computador lo ignora.</li></ul>`,
    pred: "Predice: si escribes <code>let a = -2;</code>, ¿hacia dónde abre la parábola y qué tan cerrada será?",
    exp: [
      "Cambia el número después del <code>=</code> y ejecuta.",
      "Pon <code>let a = 0;</code>. ¿Qué pasa con la curva?",
      "Prueba un decimal como <code>0.5</code> (los decimales llevan punto).",
    ],
    code: "// Variable a: guarda el valor que controla la forma\nlet a = 1;\n\n// Fórmula: y = a · x · x\nlet y = a * x * x;",
    ej: "let a = 2;\nlet y = a * x * x;",
    pistas: [
      "Solo cambia el número que está después de «let a =».",
      "Usa el valor del control a que dejaste en la Etapa 1, o pulsa «Ver mis controles como código».",
      "Los valores negativos llevan signo: let a = -2;",
    ],
  },
  {
    t: "Nivel 2 · Las variables b y c",
    mate: "y = a·x² + b·x + c",
    prog: "varias variables, + y −, orden de operaciones",
    params: P3,
    f: fq,
    fx: cuad,
    retos: [
      { a: 1, b: 2, c: -3 },
      { a: -1, b: 0, c: 4 },
      { a: 0.5, b: -2, c: 1 },
      { a: 1, b: -4, c: 3 },
    ],
    preg: [
      "¿Qué parte de la gráfica se mueve cuando cambias c?",
      "¿Qué hace b? Fíjate en el vértice (punto rojo).",
      "¿Cuándo pasa la curva por el punto (0, 0)?",
    ],
    obs: obsGen,
    term: "<b>c</b> es el valor de y cuando x = 0: donde la curva corta el eje vertical. <b>b</b>, junto con a, desplaza el vértice, que queda en x = −b/(2a). <b>a</b> sigue controlando la apertura.",
    lec: `<ul class="list-disc ml-5 space-y-0.5"><li>Ya sabes crear una variable: <code>let a = 1;</code>. Ahora crea <b>b</b> y <b>c</b> con la misma forma.</li><li><code>+</code> suma y <code>-</code> resta. Un valor negativo lleva su signo: <code>let b = -2;</code>.</li><li>El computador calcula primero las multiplicaciones (<code>*</code>) y luego las sumas, igual que en matemáticas.</li><li>Si usas una variable que no has creado, el computador no la conoce y aparece un error. ¡Esa es una pista!</li></ul>`,
    pred: "Predice: si <code>c</code> vale 3, ¿por qué punto del eje vertical pasa la curva?",
    exp: [
      "Ejecuta sin crear b y c. ¿Qué mensaje aparece? Lee la pista.",
      "Crea b y c con valor 0 y ejecuta. ¿Qué curva obtienes?",
      "Cambia solo c. ¿Qué parte de la gráfica se mueve?",
    ],
    code: "// Ya conoces esta variable\nlet a = 1;\n\n// TU TURNO: crea aquí las variables b y c, como hiciste con a\n\n\n// Fórmula completa\nlet y = a * x * x + b * x + c;",
    ej: EJ2,
    pistas: [
      "Copia la forma de la línea de a: let, el nombre, =, un número y ;.",
      "Necesitas dos líneas nuevas: una que empiece con let b y otra con let c.",
      "Usa los valores de los controles de la Etapa 1. Forma: let b = 2;",
    ],
  },
  {
    t: "Nivel 3 · Escribe la fórmula completa",
    mate: "y = a·x² + b·x + c",
    prog: "traducir una fórmula a código",
    params: P3,
    f: fq,
    fx: cuad,
    retos: [
      { a: 1, b: 0, c: -4 },
      { a: -1, b: 2, c: 3 },
      { a: 0.5, b: -1, c: -2 },
      { a: 2, b: -4, c: 2 },
    ],
    preg: [
      "¿Dónde queda el vértice cuando b = 0?",
      "¿Cómo cambia el vértice si a es negativo?",
      "¿Puedes estimar a, b y c del reto antes de escribir?",
    ],
    obs: obsGen,
    term: "Resumen: <b>a</b> abre y cierra la parábola; <b>c</b> es el corte con el eje vertical; <b>b</b>, junto con a, desplaza el vértice, ubicado en x = −b/(2a). La función completa suma los tres términos: a·x² + b·x + c.",
    lec: `<p>Programar es <b>traducir</b>: cada término de la fórmula tiene su versión en código.</p><ul class="list-disc ml-5 space-y-0.5 mt-1"><li><code>a·x²</code> se escribe <code>a * x * x</code></li><li><code>b·x</code> se escribe <code>b * x</code></li><li><code>c</code> se escribe <code>c</code></li><li>Los términos se unen con <code>+</code>, y la fórmula se guarda en <code>y</code> con <code>let y = ...;</code></li></ul><p class="mt-1">Esta vez no hay nada escrito. Crea tú las variables y la fórmula; apóyate en el ejemplo resuelto.</p>`,
    pred: "Predice: usa los controles para encontrar los valores del reto. ¿Qué valores de a, b y c crees que son?",
    exp: [
      "Escribe la fórmula con tus valores y ejecuta.",
      "Cambia el signo de a. ¿Qué pasa con el vértice?",
      "Quita un término (por ejemplo + c). ¿Qué parte de la gráfica cambia?",
    ],
    code: "// 1) Crea las variables a, b y c\n\n\n\n// 2) Escribe la fórmula de y\n",
    ej: "// Ejemplo resuelto del nivel 2\n" + EJ2,
    pistas: [
      "Primero crea las tres variables, una por línea: let a = ...; let b = ...; let c = ...;",
      "La fórmula empieza así: let y = a * x * x ...",
      "Completa con los otros términos usando +: ... + b * x + c;",
    ],
  },
];

/* ===== Estado ===== */
const MUESTRAS = Array.from({ length: 41 }, (_, i) => -10 + i * 0.5);
const xs = Array.from(
  { length: 201 },
  (_, i) => Math.round((-10 + i * 0.1) * 10) / 10,
);
const serie = (fn) => xs.map((x) => ({ x, y: fn(x) }));
const coincide = (g, h) => MUESTRAS.every((x) => Math.abs(g(x) - h(x)) < 1e-6);
let niv = 0,
  N,
  reto,
  logro = { sl: false, cod: false },
  puntos = 0,
  nPista = 0,
  avance = [true, false, false];
try {
  avance = JSON.parse(localStorage.getItem("avance3")) || avance;
  puntos = +localStorage.getItem("puntos3") || 0;
} catch (e) {}
const guardar = () => {
  try {
    localStorage.setItem("avance3", JSON.stringify(avance));
    localStorage.setItem("puntos3", puntos);
  } catch (e) {}
};
const params = () =>
  Object.fromEntries(N.params.map((q) => [q.id, +$(q.id).value]));

/* ===== Etapa 2: gráfica ===== */
const linea = (c, d) => ({
  data: [],
  borderColor: c,
  showLine: true,
  pointRadius: 0,
  borderWidth: 3,
  borderDash: d || [],
});
const grafica = new Chart($("grafica"), {
  type: "scatter",
  data: {
    datasets: [
      linea("#2563eb"),
      linea("#f97316"),
      linea("#94a3b8", [6, 6]),
      {
        data: [],
        showLine: false,
        pointRadius: 6,
        pointBackgroundColor: "#dc2626",
      },
    ],
  },
  options: {
    animation: false,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        type: "linear",
        min: -10,
        max: 10,
        position: { y: 0 },
        grid: { color: "#e2e8f0" },
      },
      y: {
        type: "linear",
        min: -10,
        max: 10,
        position: { x: 0 },
        grid: { color: "#e2e8f0" },
      },
    },
  },
});

/* ===== Retroalimentación ===== */
function confeti(n) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const col = ["#f43f5e", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"];
  for (let i = 0; i < n; i++) {
    const s = document.createElement("span");
    s.style.cssText = `left:${Math.random() * 100}%;background:${col[i % 5]};animation-delay:${Math.random() * 0.6}s;animation-duration:${1.8 + Math.random() * 1.4}s`;
    $("confeti").appendChild(s);
  }
  setTimeout(() => $("confeti").replaceChildren(), 3500);
}
let tT;
function aviso(txt) {
  $("toast").textContent = txt;
  $("toast").classList.add("show");
  clearTimeout(tT);
  tT = setTimeout(() => $("toast").classList.remove("show"), 4500);
}

function pintar() {
  $("chkSl").textContent = logro.sl ? "✅" : "⬜";
  $("chkCod").textContent = logro.cod ? "✅" : "⬜";
  $("puntos").textContent = puntos;
  grafica.data.datasets[2].borderColor =
    logro.sl || logro.cod ? "#22c55e" : "#94a3b8";
  $("btnSig").classList.toggle(
    "hidden",
    !(logro.sl && logro.cod && niv < NIVELES.length - 1),
  );
  grafica.update();
}

function celebrar(tipo) {
  logro[tipo] = true;
  const ok = logro.sl && logro.cod;
  puntos += (tipo === "sl" ? 10 : 20) + (ok ? 10 : 0);
  if (ok && niv < NIVELES.length - 1) avance[niv + 1] = true;
  guardar();
  pintar();
  nav();
  if (ok) {
    aviso(
      niv < NIVELES.length - 1
        ? "🏆 ¡Nivel superado! Se desbloqueó el siguiente."
        : "🏆 ¡Escribiste la función cuadrática completa!",
    );
    confeti(90);
  } else {
    aviso(
      tipo === "sl"
        ? "🎉 ¡Lo lograste con los controles! Ahora escríbelo con código."
        : "💻 ¡Tu código dibuja la curva del reto! Ahora hazlo con los controles.",
    );
    confeti(35);
  }
}

/* ===== Etapa 1 ===== */
function actualizar(usuario) {
  const p = Object.assign({ a: 0, b: 0, c: 0 }, params());
  N.params.forEach((q) => ($("o_" + q.id).textContent = p[q.id]));
  $("formulaViva").textContent = N.fx(p);
  $("observacion").textContent = "👀 " + N.obs(p);
  grafica.data.datasets[0].data = serie((x) => N.f(p, x));
  const v = vert(p);
  grafica.data.datasets[3].data = v ? [v] : [];
  grafica.update();
  if (
    usuario &&
    !logro.sl &&
    coincide(
      (x) => N.f(p, x),
      (x) => N.f(reto, x),
    )
  )
    celebrar("sl");
}

/* ===== Etapa 3: editor, explicación y errores ===== */
const editor = CodeMirror($("editor"), {
  mode: "javascript",
  theme: "dracula",
  lineNumbers: true,
  indentUnit: 2,
  smartIndent: true,
  autoCloseBrackets: true,
  matchBrackets: true,
  lineWrapping: true,
  extraKeys: {
    "Ctrl-Enter": () => ejecutar(true),
    "Cmd-Enter": () => ejecutar(true),
  },
});

function explicar() {
  const items = [];
  editor
    .getValue()
    .split("\n")
    .forEach((raw) => {
      const l = raw.trim();
      if (!l) return;
      let txt;
      if (l.startsWith("//"))
        txt =
          "Comentario: el computador lo ignora; sirve para explicar el código.";
      else {
        const m = l.match(/^let\s+(\w+)\s*=\s*(.+);$/);
        if (!m)
          txt =
            "Esta línea no sigue el modelo let nombre = valor; Revisa cómo está escrita.";
        else if (/^-?\d+(\.\d+)?$/.test(m[2]))
          txt = `Crea la variable «${m[1]}» y guarda en ella el valor ${m[2]}.`;
        else {
          const ops = [
            m[2].includes("*") && "* multiplica",
            m[2].includes("+") && "+ suma",
            /\s-\s/.test(m[2]) && "- resta",
          ].filter(Boolean);
          txt = `Calcula ${m[2]} y guarda el resultado en la variable «${m[1]}»${ops.length ? " (" + ops.join(", ") + ")" : ""}.`;
        }
      }
      items.push(`<li><code>${esc(l)}</code> → ${esc(txt)}</li>`);
    });
  $("explicacion").innerHTML =
    items.join("") || "<li>Escribe tu primera línea para ver qué hace.</li>";
}

const PROHIBIDO =
  /window|document|fetch|eval|Function|import|constructor|this|storage|while|for\s*\(|=>|setTimeout|setInterval/;

function pistas(codigo) {
  const ls = codigo.split("\n");
  for (let i = 0; i < ls.length; i++) {
    const l = ls[i].replace(/\/\/.*$/, "").trim(),
      n = i + 1;
    if (!l) continue;
    if (l.includes("^"))
      return `Línea ${n}: en JavaScript ^ no es potencia. Para x² escribe x * x.`;
    if (/\d,\d/.test(l))
      return `Línea ${n}: los decimales llevan punto (0.5), no coma.`;
    if (/(^|[^\w.])\d+(\.\d+)?\s*[a-zA-Z_(]/.test(l))
      return `Línea ${n}: falta el símbolo * entre el número y la letra (por ejemplo 2 * x).`;
    if (!/[;{}+\-*/,(]$/.test(l))
      return `Línea ${n}: parece que olvidaste el punto y coma (;) al final.`;
  }
  const t = codigo.replace(/\/\/.*$/gm, "");
  const o = (t.match(/\(/g) || []).length,
    c = (t.match(/\)/g) || []).length;
  return o !== c
    ? `Revisa los paréntesis: abriste ${o} y cerraste ${c}.`
    : null;
}

function traducir(e) {
  const m = e.message || "";
  if (e instanceof ReferenceError) {
    const n = (m.match(/^(\S+) is not defined/) || [])[1] || "?";
    if (n === "y")
      return "No encuentro la variable y. Debe quedar definida, por ejemplo: let y = a * x * x;";
    if (
      n !== n.toLowerCase() &&
      ["a", "b", "c", "x", "y"].includes(n.toLowerCase())
    )
      return `JavaScript distingue mayúsculas: escribe "${n.toLowerCase()}" en minúscula.`;
    return `Usas "${n}" pero no la has creado. ¿Falta una línea como let ${n} = 1; ?`;
  }
  if (e instanceof SyntaxError) {
    if (/already been declared/.test(m))
      return 'Declaraste la misma variable dos veces. Usa "let" solo la primera vez (y no declares x: ya existe).';
    if (/Unexpected identifier/.test(m))
      return "Falta un operador (+, -, *) o un punto y coma (;) entre dos elementos.";
    return "Hay un error de escritura. Revisa operadores, paréntesis y puntos y comas.";
  }
  return m || "Algo salió mal. Revisa tu código línea por línea.";
}

function mostrar(t, ok) {
  $("msgCodigo").textContent = t;
  $("msgCodigo").className =
    "mt-2 text-sm font-semibold min-h-[1.25rem] " +
    (ok ? "text-green-700" : "text-red-700");
}

function ejecutar(manual) {
  const codigo = editor.getValue();
  try {
    if (PROHIBIDO.test(codigo))
      throw new Error("Aquí solo se usan variables y la fórmula de y.");
    const pista = pistas(codigo);
    if (pista) throw new Error(pista);
    const fn = new Function("x", codigo + "\nreturn y;");
    const g = (x) => {
      const v = fn(x);
      if (typeof v !== "number" || Number.isNaN(v))
        throw new Error("La variable y debe ser un número. Revisa tu fórmula.");
      return v;
    };
    grafica.data.datasets[1].data = serie(g);
    grafica.update();
    mostrar("✅ Código ejecutado. Mira la curva naranja en la gráfica.", true);
    if (manual && !logro.cod && coincide(g, (x) => N.f(reto, x)))
      celebrar("cod");
  } catch (e) {
    grafica.data.datasets[1].data = [];
    grafica.update();
    mostrar("❌ " + traducir(e), false);
  }
}
let tm;
editor.on("change", () => {
  explicar();
  clearTimeout(tm);
  tm = setTimeout(() => ejecutar(false), 800);
});
$("btnEjecutar").addEventListener("click", () => ejecutar(true));
$("btnPasar").addEventListener("click", () => {
  editor.setValue(N.code.replace(/let a = [^;]+;/, `let a = ${params().a};`));
  ejecutar(false);
});
$("btnRestablecer").addEventListener("click", () => {
  editor.setValue(N.code);
  $("pista").textContent = "";
  nPista = 0;
});
$("btnPista").addEventListener("click", () => {
  $("pista").textContent =
    "💡 Pista " +
    ((nPista % N.pistas.length) + 1) +
    ": " +
    N.pistas[nPista % N.pistas.length];
  nPista++;
});

/* ===== Navegación y niveles ===== */
function nav() {
  $("niveles").innerHTML = NIVELES.map((n, i) => {
    const libre = avance[i],
      act = i === niv;
    return `<button data-i="${i}" ${libre ? "" : "disabled"} class="px-3 py-1.5 rounded-full text-sm font-semibold ${act ? "bg-white text-indigo-700" : libre ? "bg-indigo-500 text-white hover:bg-indigo-400" : "bg-indigo-800/60 text-indigo-300 cursor-not-allowed"}">${libre ? "" : "🔒 "}Nivel ${i + 1}</button>`;
  }).join("");
  $("niveles")
    .querySelectorAll("button")
    .forEach((b) => b.addEventListener("click", () => cargar(+b.dataset.i)));
}

function nuevoReto() {
  let r;
  do {
    r = N.retos[Math.floor(Math.random() * N.retos.length)];
  } while (
    reto &&
    JSON.stringify(Object.assign({ a: 0, b: 0, c: 0 }, r)) ===
      JSON.stringify(reto) &&
    N.retos.length > 1
  );
  reto = r;
  logro = { sl: false, cod: false };
  grafica.data.datasets[2].data = serie((x) =>
    N.f(Object.assign({ a: 0, b: 0, c: 0 }, reto), x),
  );
  reto = Object.assign({ a: 0, b: 0, c: 0 }, reto);
  pintar();
  actualizar(false);
  ejecutar(false);
}

function cargar(i) {
  niv = i;
  N = NIVELES[i];
  nPista = 0;
  $("pista").textContent = "";
  $("nivelTitulo").textContent = N.t;
  $("nivelMate").textContent = N.mate;
  $("nivelProg").textContent = N.prog;
  $("controles").innerHTML = N.params
    .map(
      (q) =>
        `<label class="block"><span class="font-semibold">${q.id} = <output id="o_${q.id}" class="text-emerald-700">${q.val}</output></span><input id="${q.id}" type="range" min="${q.min}" max="${q.max}" step="${q.step}" value="${q.val}" class="w-full accent-emerald-500"></label>`,
    )
    .join("");
  N.params.forEach((q) =>
    $(q.id).addEventListener("input", () => actualizar(true)),
  );
  $("preguntas").innerHTML = N.preg.map((t) => `<li>${t}</li>`).join("");
  $("terminos").innerHTML = N.term;
  $("leccion").innerHTML = N.lec;
  $("ejemplo").textContent = N.ej;
  $("prediccion").innerHTML = "🔮 " + N.pred;
  $("experimentos").innerHTML = N.exp.map((t) => `<li>${t}</li>`).join("");
  $("btnPasar").classList.toggle("hidden", i !== 0);
  editor.setValue(N.code);
  nav();
  nuevoReto();
}
$("btnReset").addEventListener("click", () => {
  N.params.forEach((q) => ($(q.id).value = q.val));
  actualizar(false);
});
$("btnReto").addEventListener("click", nuevoReto);
$("btnSig").addEventListener("click", () => cargar(niv + 1));
cargar(0);
