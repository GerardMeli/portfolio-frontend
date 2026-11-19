import {Component, Directive, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, ViewEncapsulation, effect, signal, untracked} from '@angular/core';

/* ---------- Données (issues de portfolio-data.sql) ---------- */
const UI:any={
 fr:{n_xp:"Expérience",n_pj:"Projets",n_sk:"Compétences",n_ed:"Formation",n_lg:"Langues",n_ct:"Contact",pdf:"Télécharger le CV (PDF)",hello:"Bonjour, je suis",c1:"Voir mes projets",c2:"Me contacter",now:"Aujourd'hui",tasks:"Missions détaillées",all:"Tous",pro:"Professionnels",per:"Personnels",tpro:"Pro",tper:"Perso",code:"Voir le code",ct_h:"Travaillons ensemble.",ct_p:"Ouvert à un poste en CDI ou CDD, et à la mobilité. Écrivez-moi, je réponds vite.",nat:"Natif",ro:"développeur backend",ci:"Yaoundé, Cameroun",mob:"ouvert à la mobilité"},
 en:{n_xp:"Experience",n_pj:"Projects",n_sk:"Skills",n_ed:"Education",n_lg:"Languages",n_ct:"Contact",pdf:"Download CV (PDF)",hello:"Hi, I'm",c1:"See my projects",c2:"Get in touch",now:"Present",tasks:"Detailed duties",all:"All",pro:"Professional",per:"Personal",tpro:"Work",tper:"Personal",code:"View code",ct_h:"Let's work together.",ct_p:"Open to permanent or fixed-term roles, and to relocation. Write to me, I reply fast.",nat:"Native",ro:"backend developer",ci:"Yaoundé, Cameroon",mob:"open to relocation"}
};
const D:any={
 head:{fr:"Développeur backend – Java / Spring Boot / Kotlin",en:"Backend Developer – Java / Spring Boot / Kotlin"},
 sum:{fr:"Développeur backend junior et diplômé en informatique de l'Institut universitaire de haute technologie Jacky Felly Nafack (JFN HUI). Expérience dans le développement d'API RESTful et de micro-services backend avec Java, Kotlin, Spring Boot et Spring Security. Solide maîtrise de la POO, de l'intégration de bases de données MySQL et PostgreSQL, et de JPA/Hibernate. À l'aise sous Linux (Ubuntu) et en équipe.",
      en:"Junior backend developer and Computer Engineering graduate of the Jacky Felly Nafack University Institute of Advanced Technology (JFN HUI). Experience building RESTful APIs and backend microservices with Java, Kotlin, Spring Boot and Spring Security. Strong command of OOP, MySQL and PostgreSQL integration, and JPA/Hibernate. Comfortable on Linux (Ubuntu) and in collaborative teams."},
 xp:[
  {co:"Connect Technology",loc:"Melen, Yaoundé",s:"2025-12",e:null,
   t:{fr:"Développeur Backend",en:"Backend Developer"},
   k:{fr:["Maintenance et optimisation du code avec Sonarqube et Jenkins, et nouvelles fonctionnalités du Game Management Studio (GMS), un module qui centralise les jeux.","Développement fullstack de FlowChat, une messagerie en ligne intégrable à d'autres applications web pour recueillir les réclamations des clients.","Développement du module de jeu de machine à sous « CoinSlot » sous forme de microservice."],
      en:["Code maintenance and optimisation with Sonarqube and Jenkins, plus new features for the Game Management Studio (GMS), a module that centralises games.","Full-stack development of FlowChat, a web messaging app that plugs into other web applications to collect customer complaints.","Development of the CoinSlot slot machine game module as a microservice."]},
   d:{fr:"Spécifications générales et détaillées (UML, design patterns) · développements et composants logiciels · tests unitaires et d'intégration · phases build et run (tierce maintenance types 1 et 2) · évolutions d'applications existantes · usine logicielle Ixi (intégration continue, SVN, Sonarqube, Jenkins, TestRails, Redmine, Nexus) · estimation des charges.",
      en:"General and detailed specifications (UML, design patterns) · software and component development · unit and integration tests · build and run phases (third-party maintenance types 1 and 2) · enhancements to existing applications · Ixi software factory (CI, SVN, Sonarqube, Jenkins, TestRails, Redmine, Nexus) · workload estimates."}},
  {co:"Sklf-Group",loc:"Mendong, Yaoundé",s:"2023-06",e:"2023-08",
   t:{fr:"Stage en développement d'applications",en:"Internship in application development"},
   k:{fr:["Jeu éducatif sous Scratch pour faire découvrir la culture camerounaise.","Révision de la POO, de l'algorithmique et des API.","Notions de base sur les réseaux."],
      en:["Educational game built in Scratch to teach Cameroonian culture.","Review of OOP, algorithmics and APIs.","Networking basics."]}}
 ],
 pj:[
  {n:"Portfolio multi-marchés",p:1,d:{fr:"CV adapté à chaque marché.",en:"CV adapted to each market."},h:{fr:["Un CV qui s'adapte au marché défini par l'utilisateur"],en:["A CV that adapts to the market the user defines"]},st:["Java","Spring Boot","PostgreSQL","Angular","Spring Security"],r:"https://github.com/GerardMeli/backend-portfolio"},
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
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements OnDestroy {
  d = D;
  year = new Date().getFullYear();
  five = [1, 2, 3, 4, 5];
  n1 = [...'Gérard Roussel'].map(c => c === ' ' ? '\u00a0' : c);
  n2 = [...'Meli Ngandjou'].map(c => c === ' ' ? '\u00a0' : c);
  links = [['xp', 'n_xp'], ['pj', 'n_pj'], ['sk', 'n_sk'], ['ed', 'n_ed'], ['ct', 'n_ct']];
  filters = [['all', 'all'], ['pro', 'pro'], ['per', 'per']];
  words = [...['Java', 'Kotlin', 'Spring Boot', 'PostgreSQL', 'Angular', 'Microservices', 'Spring Security', 'REST API', 'Jetpack Compose', 'Linux'], ...['Java', 'Kotlin', 'Spring Boot', 'PostgreSQL', 'Angular', 'Microservices', 'Spring Security', 'REST API', 'Jetpack Compose', 'Linux']];
  L = signal<'fr' | 'en'>((navigator.language || 'fr').startsWith('en') ? 'en' : 'fr');
  filter = signal('all');
  scrolled = signal(false);
  prog = signal('0%');
  mx = signal('70%');
  my = signal('30%');
  term = signal('');
  private tm: any;
  @ViewChild('tl') tl?: ElementRef<HTMLElement>;

  constructor() {
    effect(() => { const l = this.L(); document.documentElement.lang = l; untracked(() => this.type(l)); });
  }
  ngOnDestroy() { clearTimeout(this.tm); }

  u(k: string): string { return UI[this.L()][k]; }
  tx(v: any): string { return typeof v === 'string' ? v : v[this.L()]; }
  rng(s: string, e: string | null): string {
    const f = (x: string) => new Intl.DateTimeFormat(this.L(), {month: 'short', year: 'numeric'}).format(new Date(x + '-01T12:00:00'));
    return f(s) + ' – ' + (e ? f(e) : this.u('now'));
  }
  show(p: any): boolean { const f = this.filter(); return f === 'all' || (f === 'pro' && !p.p) || (f === 'per' && p.p); }
  toggle() { this.L.set(this.L() === 'fr' ? 'en' : 'fr'); }
  pdf() { window.print(); }

  @HostListener('window:beforeprint') openAll() { document.querySelectorAll('details').forEach(x => x.setAttribute('open', '')); }
  @HostListener('window:scroll') onScroll() {
    this.scrolled.set(scrollY > 40);
    const r = this.tl?.nativeElement.getBoundingClientRect();
    if (r) this.prog.set(Math.max(0, Math.min(100, (innerHeight * .6 - r.top) / r.height * 100)) + '%');
  }
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

  private type(l: 'fr' | 'en') {
    clearTimeout(this.tm);
    const u = UI[l], cur = '<span class="caret"></span>';
    const lines = [
      '<span class="k">GET</span> /gerard <span class="m">HTTP/1.1</span>', '<span class="ok">200 OK</span>', '{',
      `  <span class="k">"role"</span>: <span class="s">"${u.ro}"</span>,`,
      '  <span class="k">"stack"</span>: [<span class="s">"Java"</span>, <span class="s">"Kotlin"</span>,',
      '            <span class="s">"Spring Boot"</span>, <span class="s">"PostgreSQL"</span>],',
      '  <span class="k">"front"</span>: <span class="s">"Angular"</span>,',
      `  <span class="k">"city"</span>: <span class="s">"${u.ci}"</span>,`,
      `  <span class="k">"mobility"</span>: <span class="s">"${u.mob}"</span>`, '}'
    ];
    let i = 0;
    const step = () => {
      if (i >= lines.length) { this.term.set(lines.join('\n') + '\n' + cur); return; }
      this.term.set(lines.slice(0, i + 1).join('\n') + cur); i++;
      this.tm = setTimeout(step, i === 1 ? 700 : i === 2 ? 500 : 260);
    };
    step();
  }
}