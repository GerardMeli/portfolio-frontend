import {Component, Directive, ElementRef, HostListener, OnDestroy, OnInit, ViewEncapsulation, effect, signal, untracked} from '@angular/core';

/* ---------- Données (issues de portfolio-data.sql) ---------- */
const UI:any={
 fr:{n_xp:"Expérience",n_pj:"Projets",n_sk:"Compétences",n_ed:"Formation",n_lg:"Langues",n_ct:"Contact",pdf:"Télécharger le CV (PDF)",cv:"Télécharger mon CV",hi:"Bonjour,",iam:"Je suis",pre:"",who:"Qui suis-je ?",n_ab:"À propos",tm:"Changer de thème",th:{folio:"Folio",light:"Clair",dark:"Sombre"},cvp:"Profil",cvs:"Compétences techniques",cvx:"Expérience professionnelle",cvj:"Projets",cve:"Formation",cvl:"Langues",mob2:"Ouvert à la mobilité.",hello:"Bonjour, je suis",c1:"Voir mes projets",c2:"Me contacter",now:"Aujourd'hui",tasks:"Missions détaillées",all:"Tous",pro:"Professionnels",per:"Personnels",tpro:"Pro",tper:"Perso",code:"Voir le code",ct_h:"Travaillons ensemble.",ct_p:"Ouvert à un poste en CDI ou CDD, et à la mobilité. Écrivez-moi, je réponds vite.",nat:"Natif",ro:"développeur backend",ro2:"développeur fullstack",ci:"Yaoundé, Cameroun",mob:"ouvert à la mobilité"},
 en:{n_xp:"Experience",n_pj:"Projects",n_sk:"Skills",n_ed:"Education",n_lg:"Languages",n_ct:"Contact",pdf:"Download CV (PDF)",cv:"Download my CV",hi:"Hello,",iam:"I'm",pre:"a ",who:"Who am I?",n_ab:"About",tm:"Change theme",th:{folio:"Folio",light:"Light",dark:"Dark"},cvp:"Profile",cvs:"Technical skills",cvx:"Professional experience",cvj:"Projects",cve:"Education",cvl:"Languages",mob2:"Open to relocation.",hello:"Hi, I'm",c1:"See my projects",c2:"Get in touch",now:"Present",tasks:"Detailed duties",all:"All",pro:"Professional",per:"Personal",tpro:"Work",tper:"Personal",code:"View code",ct_h:"Let's work together.",ct_p:"Open to permanent or fixed-term roles, and to relocation. Write to me, I reply fast.",nat:"Native",ro:"backend developer",ro2:"fullstack developer",ci:"Yaoundé, Cameroon",mob:"open to relocation"}
};
const D:any={
 head:{fr:"Développeur backend – Java / Spring Boot / Kotlin",en:"Backend Developer – Java / Spring Boot / Kotlin"},
 sum:{fr:"Développeur backend junior et diplômé en informatique de l'Institut universitaire de haute technologie Jacky Felly Nafack (JFN HUI). Expérience dans le développement d'API RESTful et de micro-services backend avec Java, Kotlin, Spring Boot et Spring Security. Solide maîtrise de la POO, de l'intégration de bases de données MySQL et PostgreSQL, et de JPA/Hibernate. À l'aise sous Linux (Ubuntu) et en équipe.",
      en:"Junior backend developer and Computer Engineering graduate of the Jacky Felly Nafack University Institute of Advanced Technology (JFN HUI). Experience building RESTful APIs and backend microservices with Java, Kotlin, Spring Boot and Spring Security. Strong command of OOP, MySQL and PostgreSQL integration, and JPA/Hibernate. Comfortable on Linux (Ubuntu) and in collaborative teams."},
 xp:[
  {co:"Connect Technology",b:{fr:"Actuel",en:"Current"},loc:"Melen, Yaoundé",s:"2025-12",e:null,
   t:{fr:"Développeur Backend",en:"Backend Developer"},
   k:{fr:[
        "Maintenance et optimisation de **Game Management Studio (GMS)**, une plateforme centralisée de gestion de jeux, avec SonarQube et Jenkins, tout en développant de nouvelles fonctionnalités et en améliorant la qualité logicielle.",
        "Développement et intégration de **FlowChat**, une application de messagerie full-stack intégrée à des applications web tierces pour centraliser et gérer les réclamations des clients.",
        "Développement de **CoinSlot**, un module de machine à sous basé sur des microservices intégré à l'écosystème Game Management Studio, avec Kotlin et les technologies backend.",
        "Contribution au développement et à la maintenance de **3 modules/applications logicielles (GMS, FlowChat et CoinSlot)** sur des tâches backend, frontend et d'intégration de services.",
        "Traduction des exigences techniques et fonctionnelles en composants logiciels à l'aide de diagrammes UML, de patrons de conception (design patterns) et de spécifications techniques.",
        "Conception et exécution de **tests unitaires et d'intégration** pour valider les composants logiciels, garantir la fiabilité et prévenir les régressions.",
        "Maintenance applicative, débogage, résolution d'incidents et évolutions sur les systèmes logiciels existants.",
        "Participation aux flux CI/CD et de livraison logicielle via Jenkins and SonarQube.",
        "Contribution aux activités de build, de déploiement, de maintenance opérationnelle et d'estimation des charges logicielles."
      ],
      en:[
        "Maintain and optimize **Game Management Studio (GMS)**, a centralized game management platform, using SonarQube and Jenkins, while developing new features and improving software quality.",
        "Develop and integrate **FlowChat**, a full-stack messaging application embedded into external web applications to centralize and manage customer complaints.",
        "Develop **CoinSlot**, a microservice-based slot machine module integrated into the Game Management Studio ecosystem, using Kotlin and backend technologies.",
        "Contribute to the development and maintenance of **3 software modules/applications (GMS, FlowChat and CoinSlot)** across backend, frontend and service integration tasks.",
        "Translate technical and functional requirements into software components using UML diagrams, design patterns and technical specifications.",
        "Implement and execute **unit and integration tests** to validate software components, ensure reliability and support regression prevention.",
        "Perform application maintenance, debugging, incident troubleshooting and enhancements across existing software systems.",
        "Participate in CI/CD and software delivery workflows using Jenkins and SonarQube.",
        "Contribute to software build, deployment, operational maintenance and workload estimation activities."
      ]}},
  {co:"Sklf-Group",b:{fr:"Stage",en:"Internship"},loc:"Mendong, Yaoundé",s:"2023-06",e:"2023-08",
   t:{fr:"Stage en développement d'applications",en:"Internship in application development"},
   k:{fr:["Jeu éducatif sous Scratch pour faire découvrir la culture camerounaise.","Révision de la POO, de l'algorithmique et des API.","Notions de base sur les réseaux."],
      en:["Educational game built in Scratch to teach Cameroonian culture.","Review of OOP, algorithmics and APIs.","Networking basics."]}}
 ],
 pj:[
  {n:"KaizenApp",p:1,d:{fr:"Application mobile sécurisée pour suivre budget, dépenses et épargne.",en:"Secure mobile app to track budget, spending and savings."},h:{fr:["API de conversions multidevises, multilingues et multinationales","Google OAuth2 pour la sauvegarde cloud, les codes PIN et les empreintes digitales"],en:["API for multi-currency, multi-language and multi-country conversions","Google OAuth2 for cloud backup, PINs and fingerprints"]},st:["Jetpack Compose","Kotlin","OAuth 2 Google"],r:"https://gitlab.com/gerardmeli/android"},
  {n:"AnimeTracker",p:1,d:{fr:"Application mobile d'actualités en temps réel sur anime, mangas, films, séries et jeux vidéo.",en:"Mobile app with real-time news on anime, manga, films, series and games."},h:{fr:["Appels API : Anilist, Jikan, RAWG, TMDB"],en:["API calls: Anilist, Jikan, RAWG, TMDB"]},st:["Kotlin","Jetpack Compose"],r:"https://gitlab.com/gerardmeli/android"},
  {n:"GMS",p:0,d:{fr:"Module pour centraliser et gérer les jeux.",en:"A module for centralising and managing games."},h:{fr:[],en:[]},st:["Java","Spring Boot","PostgreSQL","Angular","Spring Security"]},
  {n:"CoinSlot",p:0,d:{fr:"Sous-module du GMS : machine à sous en microservice.",en:"A GMS sub-module: a slot machine microservice."},h:{fr:[],en:[]},st:["Kotlin","Spring Boot","PostgreSQL","Angular"]},
  {n:"FlowChat",p:0,d:{fr:"Application de messagerie en ligne intégrable.",en:"Embeddable online messaging application."},h:{fr:["Un tableau de bord distinct par application externe","Architecture en plusieurs microservices"],en:["A separate dashboard for each external application","Split across several microservices"]},st:["Kotlin","Spring Boot","PostgreSQL","Angular","Spring Security"]},
  {n:"CamVote",p:1,d:{fr:"Application web de vote en ligne.",en:"Online voting web application."},h:{fr:["Vote unique et sécurisé, résultats en temps réel","Intégrable à d'autres systèmes"],en:["Single, secure vote with real-time results","Can be integrated into other systems"]},st:["Java","Spring Boot","PostgreSQL","Angular","Spring Security"]}
 ],
 sk:[
  {n:{fr:"Frontend",en:"Frontend"},i:[["HTML",3],["CSS",3],["JavaScript",2],["Angular",2]]},
  {n:{fr:"Backend",en:"Backend"},i:[["Java",3],["Spring Boot",3],["Kotlin",2],["Spring Security",2],["Architecture microservices",3],["API REST",3]]},
  {n:{fr:"Outils",en:"Tools"},i:[["Ubuntu",3],["Maven",3],["Git, GitHub, GitLab",2]]},
  {n:{fr:"Base de données",en:"Database"},i:[["PostgreSQL",3],["MySQL",3]]},
  {n:{fr:"Qualités personnelles",en:"Personal strengths"},i:[[{fr:"Soif de connaissance",en:"Hunger to learn"},4],[{fr:"Ponctualité",en:"Punctuality"},5],[{fr:"Gestion des émotions",en:"Emotional control"},4]]}
 ],
 ed:[
  {n:"Institut Universitaire Siantou",loc:"Yaoundé, Cameroun",s:"2022-09",e:"2024-06",t:{fr:"BTS",en:"BTS"},f:{fr:"Génie informatique, option Génie logiciel",en:"Computer Engineering, Software Engineering specialism"}},
  {n:"JFN-HUI",loc:"Douala, Cameroun",s:"2024-11",e:"2025-07",t:{fr:"Licence professionnelle",en:"Bachelor's degree"},f:{fr:"Génie informatique, option Génie logiciel",en:"Computer Engineering, Software Engineering specialism"}}
 ],
 lg:[[{fr:"Français",en:"French"},{fr:"Natif",en:"Native"}],[{fr:"Anglais",en:"English"},"B1"]]
};

/* ---------- Animation d'apparition au scroll ---------- */
@Directive({selector: '[rv]', standalone: true, host: {class: 'rv'}})
export class Reveal implements OnInit, OnDestroy {
  private io?: IntersectionObserver;
  constructor(private el: ElementRef<HTMLElement>) {}
  ngOnInit() {
    if (typeof IntersectionObserver === 'undefined') { this.el.nativeElement.classList.add('in'); return; }
    this.io = new IntersectionObserver(([x]) => {
      if (x.isIntersecting) { this.el.nativeElement.classList.add('in'); this.io?.disconnect(); }
    }, {threshold: .15});
    this.io.observe(this.el.nativeElement);
  }
  ngOnDestroy() { this.io?.disconnect(); }
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [Reveal],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnDestroy {
  d = D;
  year = new Date().getFullYear();
  five = [1, 2, 3, 4, 5];
  links = [['ab', 'n_ab'], ['xp', 'n_xp'], ['pj', 'n_pj'], ['sk', 'n_sk'], ['ed', 'n_ed'], ['ct', 'n_ct']];
  filters = [['all', 'all'], ['pro', 'pro'], ['per', 'per']];
  L = signal<'fr' | 'en'>((navigator.language || 'fr').startsWith('en') ? 'en' : 'fr');
  theme = signal<'folio' | 'light' | 'dark'>('folio'); // folio = ng-dev-folio · light/dark = developer-portfolio
  filter = signal('all');
  scrolled = signal(false);
  mx = signal('72%');
  my = signal('25%');
  term = signal('');
  role = signal('');
  private tm: any;
  private rt: any;
  private started = false;

  constructor() {
    effect(() => { const l = this.L(); document.documentElement.lang = l; untracked(() => { this.type(l); this.cycle(l, this.started ? 300 : 2900); this.started = true; }); });
    effect(() => { document.documentElement.dataset['theme'] = this.theme(); });
  }
  ngOnDestroy() { clearTimeout(this.tm); clearTimeout(this.rt); }

  u(k: string): string { return UI[this.L()][k]; }
  tx(v: any): string { return typeof v === 'string' ? v : v[this.L()]; }
  rng(s: string, e: string | null): string {
    const f = (x: string) => new Intl.DateTimeFormat(this.L(), {month: 'short', year: 'numeric'}).format(new Date(x + '-01T12:00:00'));
    return f(s) + ' – ' + (e ? f(e) : this.u('now'));
  }
  show(p: any): boolean { const f = this.filter(); return f === 'all' || (f === 'pro' && !p.p) || (f === 'per' && p.p); }
  skl(c: any): string { return c.i.map((s: any) => this.tx(s[0])).join(', '); }
  bul(s: string): string[] { return s.split(' · ').map(b => b.charAt(0).toUpperCase() + b.slice(1)); }
  fmt(s: string): string { return s ? s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') : ''; }
  toggleLang() { this.L.set(this.L() === 'fr' ? 'en' : 'fr'); }
  cycleTheme() { const o = ['folio', 'light', 'dark'] as const; this.theme.set(o[(o.indexOf(this.theme()) + 1) % o.length]); }
  themeLabel(): string { return UI[this.L()].th[this.theme()]; }
  toTop() { scrollTo({top: 0, behavior: 'smooth'}); }
  /** Imprime uniquement le CV canadien (Letter, 2 pages) ; le nom du fichier PDF vient du titre de la page. */
  printCv() {
    const t = document.title;
    document.title = 'Gerard Roussel Meli Ngandjou';
    window.print();
    document.title = t;
  }

  @HostListener('window:scroll') onScroll() { this.scrolled.set(scrollY > 40); }
  spot(e: PointerEvent) { this.mx.set(e.clientX + 'px'); this.my.set(e.clientY + 'px'); }
  tilt(e: PointerEvent) {
    const c = e.currentTarget as HTMLElement, r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    c.style.setProperty('--x', x * 100 + '%'); c.style.setProperty('--y2', y * 100 + '%');
    c.style.transform = `perspective(800px) rotateX(${(.5 - y) * 7}deg) rotateY(${(x - .5) * 9}deg)`;
  }
  untilt(e: PointerEvent) { (e.currentTarget as HTMLElement).style.transform = ''; }
  mag(e: PointerEvent) {
    const m = e.currentTarget as HTMLElement, r = m.getBoundingClientRect();
    m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .06}px,${(e.clientY - r.top - r.height / 2) * .2}px)`;
  }
  unmag(e: PointerEvent) { (e.currentTarget as HTMLElement).style.transform = ''; }

  /** Titre qui alterne : « backend developer » s'efface lettre par lettre, puis « fullstack developer » s'écrit, et ainsi de suite. */
  private cycle(l: 'fr' | 'en', delay: number) {
    clearTimeout(this.rt);
    const words: string[] = [UI[l].ro, UI[l].ro2];
    if (typeof matchMedia !== 'undefined' && matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) { this.role.set(words[0]); return; }
    let w = 0, n = 0, erasing = false;
    this.role.set('');
    const tick = () => {
      const word = words[w];
      if (!erasing) {
        this.role.set(word.slice(0, ++n));
        if (n === word.length) { erasing = true; this.rt = setTimeout(tick, 1800); return; } // pause : mot complet
        this.rt = setTimeout(tick, 85);
      } else {
        this.role.set(word.slice(0, --n));
        if (n === 0) { erasing = false; w = (w + 1) % words.length; this.rt = setTimeout(tick, 350); return; }
        this.rt = setTimeout(tick, 45);
      }
    };
    this.rt = setTimeout(tick, delay);
  }

  private type(l: 'fr' | 'en') {
    clearTimeout(this.tm);
    const u = UI[l], cur = '<span class="caret"></span>';
    const lines = [
      '<span class="kw">const</span> <span class="fn">developer</span> = {',
      '  name: <span class="st">\'Gerard Roussel Meli Ngandjou\'</span>,',
      `  role: <span class="st">'${u.ro}'</span>,`,
      '  stack: [<span class="st">\'Java\'</span>, <span class="st">\'Kotlin\'</span>, <span class="st">\'Spring Boot\'</span>,',
      '    <span class="st">\'PostgreSQL\'</span>, <span class="st">\'Angular\'</span>],',
      `  city: <span class="st">'${u.ci}'</span>,`,
      '  relocation: <span class="nu">true</span>,',
      '  <span class="fn">hireable</span>() {',
      '    <span class="kw">return</span> <span class="th">this</span>.stack.length >= <span class="nu">5</span>;',
      '  }', '};'
    ];
    let i = 0;
    const step = () => {
      if (i >= lines.length) { this.term.set(lines.join('\n') + '\n' + cur); return; }
      this.term.set(lines.slice(0, i + 1).join('\n') + cur); i++;
      this.tm = setTimeout(step, i === 1 ? 900 : 240);
    };
    step();
  }
}