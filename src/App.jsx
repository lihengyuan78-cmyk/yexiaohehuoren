import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronDown, Phone, ShieldCheck, 
  CheckCircle, DollarSign, Settings, 
  Upload, Layout, Image as ImageIcon, ArrowRight,
  MessageCircle, Award, ChevronRight
} from 'lucide-react';

// --- 初始配置数据 ---
const INITIAL_CONFIG = {
  brand: {
    name: '太原市民艺术夜校',
    slogan: '点亮城市夜生活 · 普及全民艺术美育',
    // 👇 修改为 public 文件夹下的路径。
    // 例如您的图片在 public/logo.png，这里就写 '/logo.png'
    logo: '/logo.png', 
  },
  hero: {
    title: '市民身边的艺术学堂',
    subtitle: '党建引领 · 文化惠民 · 官方背书 · 全城覆盖',
    // 您之前的修改：图片来源和尺寸
    image: '/banner.jpg?auto=format&fit=crop&q=80&w=2000', 
    btnPrimary: '立即申请合伙人',
    btnPrimaryLink: '#合作模式', // 主按钮链接
    btnSecondary: '查看最新课程',
    btnSecondaryLink: 'https://tysmysyx.cn/' // 👈 修改这里来更改"查看最新课程"按钮的链接
  },
  navStructure: [
    { 
      title: "关于夜校", 
      items: [
        { name: "品牌介绍", link: "#brand", desc: "了解太原市民艺术夜校品牌历程" },
        { name: "党建引领", link: "#party", desc: "党建先锋引领作用" },
        { name: "发展历程", link: "#history", desc: "从创建到今天的发展历程" },
        { name: "廉洁合规", link: "#compliance", desc: "廉洁透明的运营承诺" }
      ]
    },
    { 
      title: "合伙人招募", 
      items: [
        { name: "招募政策", link: "#recruit-policy", desc: "合伙人招募最新政策" },
        { name: "合作优势", link: "#advantages", desc: "与我们合作的独特优势" },
        { name: "招募流程", link: "#process", desc: "简单六步成为合伙人" },
        { name: "常见问题", link: "#faq", desc: "合伙人常见问题解答" }
      ]
    },
    { 
      title: "课程体系", 
      items: [
        { name: "非遗传承", link: "#heritage", desc: "传统非遗项目继承与发扬" },
        { name: "生活美学", link: "#aesthetics", desc: "提升生活品质的美学课程" },
        { name: "职场技能", link: "#skills", desc: "职业发展和实用技能培训" },
        { name: "亲子互动", link: "#family", desc: "适合全家的互动艺术课程" }
      ]
    },
    { 
      title: "新闻动态", 
      items: [
        { name: "通知公告", link: "#notice", desc: "官方通知和公告信息" },
        { name: "媒体报道", link: "#media", desc: "权威媒体对夜校的报道" },
        { name: "政策解读", link: "#policy", desc: "最新政策的专业解读" }
      ]
    },
    { 
      title: "社会责任", 
      items: [
        { name: "公益讲座", link: "#public-lecture", desc: "免费公益讲座安排" },
        { name: "志愿服务", link: "#volunteer", desc: "加入志愿服务团队" },
        { name: "乡村振兴", link: "#rural", desc: "乡村文化振兴项目" }
      ]
    }
  ],
  process: [
    { step: '01', title: '项目咨询', desc: '了解夜校运营模式与政策' },
    { step: '02', title: '资质审核', desc: '提交场地或师资证明材料' },
    { step: '03', title: '实地考察', desc: '运营团队评估场地可行性' },
    { step: '04', title: '签约合作', desc: '确定合作模式并签署协议' },
    { step: '05', title: '装修/培训', desc: '统一VI形象与教务系统培训' },
    { step: '06', title: '正式开课', desc: '官方平台上线招生' }
  ],
  models: [
    {
      type: 'FLAGSHIP',
      name: '旗舰合伙人',
      badge: '适合成熟机构',
      fee: '¥150000元/ 年',
      share: '10% 流水抽成',
      desc: '针对核心商圈、文创园区的大型场地。您拥有极高的经营自主权与利润空间，享受夜校总校挂牌权益。',
      rights: ['核心商圈独家保护', '总校级品牌授权', '自主定价权', '高净值学员导入']
    },
    {
      type: 'COMMUNITY',
      name: '社区合伙人',
      badge: '适合个人/小微创业',
      fee: '¥0 入驻费',
      share: '51% 流水抽成',
      desc: '针对社区活动室、书店、咖啡馆等闲置空间。零风险启动，平台提供全套招生流量与教务支持。',
      rights: ['0资金启动门槛', '官方全媒体矩阵招生', '标准化课程包输出', '保姆式运营指导']
    }
  ],
  news: [
    { date: '2024-03-15', tag: '党建动态', title: '太原市民艺术夜校"红色宣讲团"走进社区，艺术党课受热捧' },
    { date: '2024-03-12', tag: '媒体报道', title: '山西日报：点亮夜经济，太原夜校探索"以文兴商"新模式' },
    { date: '2024-03-10', tag: '通知公告', title: '关于2024年春季学期社区合伙人招募的补充通知' }
  ],
  contact: {
    phone: '18734867402',
    address: '山西省太原市迎泽区新建南路二社区党群服务中心二层',
    email: '18734867402'
  },
  brandProfile: {
    mainDesc: '太原市民艺术夜校是一个在党建引领下，精准服务青年"八小时外"成长需求的创新平台。',
    startDate: '2024年3月',
    campusCount: 7,
    campusImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
    campuses: [
      {
        district: '小店区',
        locations: [
          '唐槐校区：太原市小店区开新街梧桐大厦',
          '首开校区：太原市小店区平阳南路首开国风琅樾物业二层',
          '亲贤校区：太原市小店区亲贤西街与体育西路千禧大厦28.29层'
        ]
      },
      {
        district: '迎泽区',
        locations: [
          '老军营校区：太原市迎泽区新建南路文苑巷15号、老军营小区第二社区5号楼',
          '青年路校区：太原市迎泽区青年路20号（地铁1号线柳南站南300米）'
        ]
      },
      {
        district: '万柏林区',
        locations: [
          '西山校区：太原市万柏林区中海国际社区安宁街122号（地铁1号线西铭路站）'
        ]
      }
    ],
    highlights: [
      {
        icon: '⭐',
        title: '人气旺、反响好',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600',
        content: '精准对接青年需求，累计开设超过70种课程，从非遗、艺术到各种技能。年度服务和接待市民突破2万人次。线上抖音平台"#太原市民艺术夜校"话题累计播放量超过2300万次。'
      },
      {
        icon: '🎯',
        title: '模式新、接地气',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600',
        content: '在党和政府的领导支持下，核心采用"党建+"模式。创新"白托夜校"服务模式：白天为老人、儿童日间活动中心；夜间（19:00-21:00）为青年学习教室。对社区空间"分时复用"，为社区阵地注入新活力。'
      },
      {
        icon: '✨',
        title: '品质高、很普惠',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600',
        content: '坚持"高质低价"理念。师资汇聚高校教授、非遗传承人等高级人才，签约教师中党员占比60%，确保高水平教学。课程定价不超过500元一期，真正让青年"学得起、学得好"。'
      }
    ]
  }
};

// --- 组件部分 ---

const SectionHeader = ({ title, subtitle, align = 'center', light = false }) => (
  <div className={`mb-12 text-${align} ${light ? 'text-white' : 'text-gray-900'}`}>
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 relative inline-block">
      {title}
      <span className={`block h-1.5 w-full mt-2 rounded-full ${light ? 'bg-white/30' : 'bg-red-600'}`}></span>
    </h2>
    {subtitle && <p className={`mt-4 text-lg ${light ? 'text-white/80' : 'text-gray-600'}`}>{subtitle}</p>}
  </div>
);

export default function NightSchoolOfficial() {
  const [config, setConfig] = useState(INITIAL_CONFIG);
  const [activeNav, setActiveNav] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // 后台管理状态
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- 管理员逻辑 ---
  const handleLogin = () => {
    if (adminPassword === 'admin') setIsLoggedIn(true);
    else alert('密码错误 (默认: admin)');
  };

  const updateConfig = (path, value) => {
    setConfig(prev => {
      const newConfig = { ...prev };
      const keys = path.split('.');
      let current = newConfig;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newConfig;
    });
  };

  const handleImageUpload = (e, path) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateConfig(path, reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="font-sans text-gray-800 bg-white relative">
      
      {/* --- 顶部通栏 --- */}
      <div className="bg-gray-900 text-gray-300 text-xs py-2 px-4 hidden md:flex justify-between items-center">
        <div className="flex gap-4">
          <span>欢迎访问太原市民艺术夜校官方平台</span>
          <span className="flex items-center gap-1 text-red-400"><ShieldCheck size={12}/> 官方认证 · 党建引领</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">投资者关系</a>
          <a href="#" className="hover:text-white transition-colors">廉洁举报</a>
          <a href="#" className="hover:text-white transition-colors">员工通道</a>
        </div>
      </div>

      {/* --- 导航栏 --- */}
      <nav 
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'}`}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center relative">
          
          {/* Logo 区域：直接使用 config 中的图片地址 */}
          <div className="flex items-center gap-3">
            <img 
              src={config.brand.logo} 
              alt="Logo" 
              className="w-12 h-12 object-contain" 
            />
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tighter text-gray-900 leading-none">
                {config.brand.name}
              </h1>
              <p className="text-[10px] text-gray-500 tracking-wider">TAIYUAN CITIZEN ART NIGHT SCHOOL</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center h-full">
            {config.navStructure.map((nav, idx) => (
              <div 
                key={idx}
                className="relative group px-5 py-4 cursor-pointer h-full flex items-center"
                onMouseEnter={() => setActiveNav(idx)}
                onMouseLeave={() => setActiveNav(null)}
              >
                <span className="font-bold text-gray-700 group-hover:text-red-600 transition-colors flex items-center gap-1">
                  {nav.title}
                  <ChevronDown size={14} className={`transform transition-transform ${activeNav === idx ? 'rotate-180' : ''}`} />
                </span>
                
                {/* 悬停下拉菜单 */}
                <div 
                  className={`absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white shadow-xl rounded-b-lg border-t-2 border-red-600 overflow-hidden transition-all duration-200 ${activeNav === idx ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                >
                  {nav.items.map((item, i) => (
                    <a key={i} href={item.link} className="block px-6 py-3 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors border-b border-gray-50 last:border-0">
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 text-red-600 font-bold mr-4">
              <Phone size={18} />
              <span className="text-lg">{config.contact.phone}</span>
            </div>
            <button className="bg-red-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
              合伙人咨询
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-gray-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t absolute w-full h-[calc(100vh-64px)] overflow-y-auto pb-20">
            {config.navStructure.map((nav, idx) => (
              <div key={idx} className="border-b border-gray-100">
                <div className="px-6 py-4 font-bold text-gray-800 flex justify-between items-center bg-gray-50">
                  {nav.title}
                </div>
                <div className="bg-white px-6 py-2">
                  {nav.items.map((item, i) => (
                    <a key={i} href={item.link} className="block py-3 text-gray-500 text-sm border-b border-gray-50 last:border-0 pl-4">
                      <div className="font-semibold text-gray-700">{item.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative h-[300px] md:h-[600px] bg-gray-900 overflow-hidden group">
        <img 
          src={config.hero.image} 
          alt="Hero" 
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[20s]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-2xl text-white">
              <div className="inline-flex items-center gap-2 bg-red-600/90 text-white px-3 py-1 rounded text-xs font-bold mb-6 tracking-widest backdrop-blur-sm">
                <Award size={14} /> 官方唯一指定平台
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
                {config.hero.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-10 font-light leading-relaxed border-l-4 border-red-600 pl-6">
                {config.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={config.hero.btnPrimaryLink} className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded font-bold text-lg transition-all flex items-center justify-center gap-2 no-underline cursor-pointer">
                  {config.hero.btnPrimary} <ArrowRight size={20} />
                </a>
                <a href={config.hero.btnSecondaryLink} className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-8 py-4 rounded font-bold text-lg transition-all no-underline cursor-pointer flex items-center justify-center">
                  {config.hero.btnSecondary}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 品牌简介页面 --- */}
      <section id="brand" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <SectionHeader title="品牌简介" subtitle="在党建引领下精准服务青年成长" />

          {/* 核心理念 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1">
              <img 
                src={config.brandProfile.campusImage} 
                alt="校区环境" 
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
                🎯 品牌使命
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-6 leading-tight">
                {config.brandProfile.mainDesc}
              </h3>
              <div className="space-y-4 text-gray-700">
                <p className="flex items-start gap-3">
                  <span className="text-red-600 text-2xl flex-shrink-0">✓</span>
                  <span><strong>运营开始：</strong>{config.brandProfile.startDate}正式运营</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-red-600 text-2xl flex-shrink-0">✓</span>
                  <span><strong>校区规模：</strong>已建立{config.brandProfile.campusCount}个校区，覆盖太原多个区域</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-red-600 text-2xl flex-shrink-0">✓</span>
                  <span><strong>课程类型：</strong>70+种课程，涵盖非遗、艺术、技能等全方位</span>
                </p>
              </div>
            </div>
          </div>

          {/* 校区分布 */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-20">
            <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
              <span className="text-red-600">📍</span> 七大校区分布
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {config.brandProfile.campuses.map((area, idx) => (
                <div key={idx} className="bg-gradient-to-br from-red-50 to-white rounded-lg p-6 border border-red-200">
                  <h4 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📌</span>
                    {area.district}
                  </h4>
                  <ul className="space-y-3">
                    {area.locations.map((location, locIdx) => (
                      <li key={locIdx} className="text-sm text-gray-700 leading-relaxed">
                        <span className="text-red-500 font-bold">•</span> {location}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 三大特色 */}
          <div className="space-y-16">
            {config.brandProfile.highlights.map((highlight, idx) => (
              <div key={idx} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <img 
                    src={highlight.image} 
                    alt={highlight.title} 
                    className="rounded-lg shadow-lg w-full h-80 object-cover hover:shadow-2xl transition-shadow duration-300"
                  />
                </div>
                <div className={idx % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full text-3xl mb-6">
                    {highlight.icon}
                  </div>
                  <h4 className="text-2xl font-black text-gray-900 mb-4">
                    第{idx + 1}个特色：{highlight.title}
                  </h4>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {highlight.content}
                  </p>
                  <div className="flex items-center gap-2 text-red-600 font-bold">
                    <span>深入了解</span>
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 品牌愿景 */}
          <div className="mt-20 bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-8 md:p-12 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-black mb-4">品牌愿景</h3>
            <p className="text-lg leading-relaxed mb-6 opacity-95">
              太原市民艺术夜校不仅是一个学习平台，更是我们探索基层社会治理、服务青年发展的重要阵地。
            </p>
            <p className="text-lg leading-relaxed opacity-90">
              我们希望通过努力，为太原的社区建设贡献更多力量，让更多青年在"八小时外"找到属于自己的艺术梦想和成长空间。
            </p>
          </div>
        </div>
      </section>

      {/* --- 招募流程 --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader title="简单六步 · 成为夜校合伙人" subtitle="标准化流程，专业团队全程扶持" />
          
          <div className="relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gray-100 -z-10"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
              {config.process.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-gray-100 flex flex-col items-center justify-center mb-6 group-hover:border-red-600 group-hover:bg-red-50 transition-all duration-300 shadow-sm z-10">
                    <span className="text-2xl font-black text-gray-300 group-hover:text-red-600 transition-colors">{step.step}</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-500 px-2">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- 合作模式 --- */}
      <section className="py-24 bg-gray-50" id="合作模式">
        <div className="container mx-auto px-4">
          <SectionHeader title="多种合作模式 · 丰俭由人" subtitle="无论您是成熟机构还是个人创业，都有适合您的方案" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {config.models.map((model, idx) => (
              <div key={idx} className={`bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-2 ${idx === 0 ? 'border-gray-200' : 'border-red-600'} flex flex-col`}>
                <div className={`p-8 ${idx === 0 ? 'bg-gray-800 text-white' : 'bg-red-600 text-white'}`}>
                  <div className="flex justify-between items-start mb-4">
                     <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded text-xs font-bold tracking-wider">{model.badge}</span>
                     {idx === 1 && <span className="bg-yellow-400 text-red-900 text-xs font-bold px-2 py-1 rounded animate-pulse">另一种选择</span>}
                  </div>
                  <h3 className="text-3xl font-black mb-2">{model.name}</h3>
                  <p className="opacity-80 text-sm">{model.desc}</p>
                </div>
                <div className="px-8 py-6 border-b border-dashed border-gray-200 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">运营管理费</div>
                    <div className="text-2xl font-black text-gray-800">{model.fee}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">流水抽成比例</div>
                    <div className="text-2xl font-black text-red-600">{model.share}</div>
                  </div>
                </div>
                <div className="p-8 bg-white flex-1">
                  <ul className="space-y-4">
                    {model.rights.map((right, rIdx) => (
                      <li key={rIdx} className="flex items-center gap-3 text-gray-700 font-medium">
                        <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                        {right}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 pt-0">
                  <button className={`w-full py-4 rounded-xl font-bold text-lg transition-colors ${idx === 0 ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' : 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-200'}`}>
                    申请{model.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 新闻动态 --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-end mb-10 border-b-2 border-red-600 pb-4">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <span className="w-2 h-8 bg-red-600"></span>
              新闻动态与党建引领
            </h2>
            <a href="#" className="text-sm text-gray-500 hover:text-red-600 flex items-center gap-1">更多资讯 <ChevronRight size={14}/></a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 relative group cursor-pointer overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800" className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="News" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-6">
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded w-fit mb-2">置顶</span>
                <h3 className="text-white font-bold text-lg leading-snug">太原市民艺术夜校党支部开展“不忘初心”主题教育活动</h3>
              </div>
            </div>
            <div className="md:col-span-2 space-y-4">
              {config.news.map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-2 min-w-[120px]">
                    <span className="text-gray-400 font-mono text-sm">{item.date}</span>
                  </div>
                  <div className="flex-1">
                    <span className="inline-block px-2 py-0.5 border border-red-200 text-red-600 text-[10px] rounded mr-2">{item.tag}</span>
                    <span className="text-gray-800 font-medium hover:text-red-600 transition-colors line-clamp-1">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 text-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-gray-800 pb-12">
            <div className="col-span-1 md:col-span-1">
              <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <Phone className="text-red-600" /> 加盟热线
              </h4>
              <div className="text-2xl font-black text-white mb-4 font-mono">{config.contact.phone}</div>
              <p className="mb-2">周一至周日 9:00 - 18:00</p>
              <button className="border border-gray-600 text-white px-4 py-2 rounded hover:bg-white hover:text-black transition-colors mt-4">
                在线客服咨询
              </button>
            </div>
            <div className="col-span-1 md:col-span-2 grid grid-cols-3 gap-8">
              <div>
                <h4 className="text-white font-bold mb-6">关于我们</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="hover:text-red-500">品牌故事</a></li>
                  <li><a href="#" className="hover:text-red-500">党建引领</a></li>
                  <li><a href="#" className="hover:text-red-500">师资力量</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6">加入我们</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="hover:text-red-500">加盟流程</a></li>
                  <li><a href="#" className="hover:text-red-500">费用说明</a></li>
                  <li><a href="#" className="hover:text-red-500">门店查询</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6">社会责任</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="hover:text-red-500">公益活动</a></li>
                  <li><a href="#" className="hover:text-red-500">廉洁合规</a></li>
                  <li><a href="#" className="hover:text-red-500">隐私政策</a></li>
                </ul>
              </div>
            </div>
            <div className="col-span-1 text-center md:text-left">
              <div className="bg-white p-2 w-32 h-32 mx-auto md:mx-0 mb-4 rounded">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs text-center">
                  二维码占位区
                </div>
              </div>
              <p className="text-xs">关注官方公众号<br/>获取最新开课信息</p>
            </div>
          </div>
          <div className="text-center text-xs text-gray-600">
            <p className="mb-2">版权所有 © 2024 太原市民艺术夜校 | 晋ICP备12345678号</p>
            <p>地址：{config.contact.address}</p>
          </div>
        </div>
      </footer>

      {/* --- CMS 后台 --- */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAdminOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
            
            <div className="p-5 border-b flex justify-between items-center bg-gray-900 text-white">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <Layout size={18} /> 官网装修后台
              </h2>
              <button onClick={() => setIsAdminOpen(false)} className="hover:bg-gray-700 p-1 rounded">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {!isLoggedIn ? (
                <div className="h-full flex flex-col items-center justify-center">
                   <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                     <Settings size={32} />
                   </div>
                   <h3 className="font-bold text-xl mb-2 text-gray-800">管理员登录</h3>
                   <p className="text-gray-500 text-sm mb-6">请输入安全密钥以编辑网站内容</p>
                   <input 
                     type="password" 
                     className="w-full p-3 border rounded-lg mb-4 text-center"
                     placeholder="默认密码: admin"
                     value={adminPassword}
                     onChange={e => setAdminPassword(e.target.value)}
                   />
                   <button onClick={handleLogin} className="w-full py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700">验证身份</button>
                </div>
              ) : (
                <div className="space-y-8">
                  
                  {/* 👇 修改点3：已移除 Logo 上传，仅保留名称修改 */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 border-b pb-2 flex items-center gap-2">
                      <Settings size={14}/> 品牌基础配置
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">品牌名称</label>
                        <input 
                           value={config.brand.name}
                           onChange={(e) => updateConfig('brand.name', e.target.value)}
                           className="w-full p-2 border rounded text-sm focus:border-red-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Banner Setting */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 border-b pb-2 flex items-center gap-2">
                      <ImageIcon size={14}/> 首页 Banner
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">主标题</label>
                        <input 
                           value={config.hero.title}
                           onChange={(e) => updateConfig('hero.title', e.target.value)}
                           className="w-full p-2 border rounded text-sm focus:border-red-500 outline-none"
                        />
                      </div>
                      <div>
                         <label className="block text-xs font-bold text-gray-700 mb-1">背景图片</label>
                         <div className="relative group cursor-pointer h-32 w-full rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-red-500">
                           <img src={config.hero.image} className="w-full h-full object-cover opacity-60" />
                           <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600">
                              <Upload size={20} />
                              <span className="text-xs mt-1">点击更换图片</span>
                           </div>
                           <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e, 'hero.image')} />
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Structure Setting */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 border-b pb-2 flex items-center gap-2">
                      <ChevronDown size={14}/> 导航栏菜单
                    </h3>
                    <div className="space-y-4 max-h-80 overflow-y-auto">
                      {config.navStructure.map((nav, navIdx) => (
                        <div key={navIdx} className="border-l-2 border-red-600 pl-3 pb-3">
                          <label className="block text-xs font-bold text-gray-700 mb-2">栏目：{nav.title}</label>
                          <div className="space-y-2">
                            {nav.items.map((item, itemIdx) => (
                              <div key={itemIdx} className="bg-gray-50 p-2 rounded">
                                <input 
                                   type="text"
                                   value={item.name}
                                   onChange={(e) => {
                                     const newConfig = { ...config };
                                     newConfig.navStructure[navIdx].items[itemIdx].name = e.target.value;
                                     setConfig(newConfig);
                                   }}
                                   placeholder="菜单项名称"
                                   className="w-full p-1 border rounded text-xs mb-1 focus:border-red-500 outline-none"
                                />
                                <input 
                                   type="text"
                                   value={item.link}
                                   onChange={(e) => {
                                     const newConfig = { ...config };
                                     newConfig.navStructure[navIdx].items[itemIdx].link = e.target.value;
                                     setConfig(newConfig);
                                   }}
                                   placeholder="链接地址 (如: #brand 或 https://...)"
                                   className="w-full p-1 border rounded text-xs mb-1 focus:border-red-500 outline-none"
                                />
                                <input 
                                   type="text"
                                   value={item.desc}
                                   onChange={(e) => {
                                     const newConfig = { ...config };
                                     newConfig.navStructure[navIdx].items[itemIdx].desc = e.target.value;
                                     setConfig(newConfig);
                                   }}
                                   placeholder="菜单描述"
                                   className="w-full p-1 border rounded text-xs focus:border-red-500 outline-none"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>
            
            {/* Footer Action */}
            {isLoggedIn && (
               <div className="p-4 bg-white border-t">
                 <button onClick={() => setIsAdminOpen(false)} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold shadow-lg flex items-center justify-center gap-2">
                   <CheckCircle size={18} /> 保存并发布
                 </button>
               </div>
            )}
          </div>
        </div>
      )}

      {/* --- 悬浮侧边栏 --- */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        <button className="bg-red-600 text-white p-3 rounded-lg shadow-lg hover:bg-red-700 transition-colors group relative flex items-center justify-center">
          <MessageCircle size={24} />
          <span className="absolute right-full mr-2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">在线咨询</span>
        </button>
        <button 
          onClick={() => setIsAdminOpen(true)}
          className="bg-gray-800 text-white p-3 rounded-lg shadow-lg hover:bg-black transition-colors group relative flex items-center justify-center"
        >
          <Settings size={24} />
           <span className="absolute right-full mr-2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">网站装修</span>
        </button>
      </div>

      <style jsx global>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}