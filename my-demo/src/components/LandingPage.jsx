import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, BarChart3, Clock, TrendingUp, Users, Award, ArrowRight, Sparkles, Database, Shield, Zap, Globe, Star } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState({});
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const heroRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(prev => ({
                        ...prev,
                        [entry.target.id]: entry.isIntersecting
                    }));
                });
            },
            { threshold: 0.1, rootMargin: '-50px' }
        );

        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const AnimatedSection = ({ children, id, delay = 0, className = "" }) => (
        <div
            id={id}
            data-animate
            className={`animated-section ${isVisible[id] ? 'visible' : ''} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );

    const FloatingElement = ({ className, delay = 0 }) => (
        <div
            className={`floating-element ${className}`}
            style={{ animationDelay: `${delay}s` }}
        />
    );

    return (
        <div className="landing-page">
            {/* Dynamic Background */}
            <div
                className="dynamic-background"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
                }}
            />

            {/* Floating Elements */}
            <FloatingElement className="float-1" delay={0} />
            <FloatingElement className="float-2" delay={1} />
            <FloatingElement className="float-3" delay={2} />
            <FloatingElement className="float-4" delay={1.5} />

            {/* Hero Section */}
            <section ref={heroRef} className="hero-section">
                {/* Animated background shapes */}
                <div className="hero-background">
                    <div className="bg-shape-1" />
                    <div className="bg-shape-2" />
                </div>

                <div
                    className="hero-content"
                    style={{ transform: `translateY(${scrollY * 0.2}px)` }}
                >
                    {/* Logo with glow effect */}
                    <div className="logo-container">
                        <h1 className="main-logo">
                            Team<span className="logo-accent">6</span>
                        </h1>
                        <div className="logo-glow" />
                    </div>

                    <div className="slogan-container">
                        <p className="slogan">
                            <Sparkles className="sparkle-icon" />
                            진료 외 시간, 데이터로 수익을 올려보세요.
                        </p>
                    </div>

                    <div className="hero-buttons">
                        <button className="primary-button">
                            <div className="button-shine" />
                            <span className="button-content">
                <Zap className="button-icon" />
                Team6과 함께해보세요
                <ArrowRight className="arrow-icon" />
              </span>
                        </button>

                        <button className="secondary-button">
              <span className="button-content">
                <Globe className="button-icon" />
                데모 보기
              </span>
                        </button>
                    </div>
                </div>

                <div className="scroll-indicator">
                    <div className="scroll-icon">
                        <ChevronDown />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <AnimatedSection id="stats">
                        <div className="stats-grid">
                            {[
                                { number: "150+", label: "파트너 병원", icon: Users },
                                { number: "32%", label: "평균 수익 증가", icon: TrendingUp },
                                { number: "89%", label: "데이터 활용도", icon: BarChart3 },
                                { number: "24/7", label: "지원 서비스", icon: Shield }
                            ].map((stat, idx) => (
                                <div key={idx} className="stat-card">
                                    <div className="stat-content">
                                        <stat.icon className="stat-icon" />
                                        <div className="stat-number">{stat.number}</div>
                                        <div className="stat-label">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Services Section */}
            <section className="services-section">
                <div className="services-background" />

                <div className="container">
                    <AnimatedSection id="services-title">
                        <div className="section-header">
                            <h2 className="section-title">
                                <span className="title-gradient">혁신적인</span> 솔루션
                            </h2>
                            <p className="section-subtitle">
                                의료 데이터의 무한한 가능성을 발견하고, 새로운 수익 모델을 창출하세요
                            </p>
                        </div>
                    </AnimatedSection>

                    <div className="services-grid">
                        {[
                            {
                                icon: Database,
                                title: "AI 데이터 분석",
                                description: "머신러닝과 AI를 활용한 고도화된 의료 데이터 분석으로 숨겨진 인사이트를 발견합니다.",
                                colorClass: "service-blue"
                            },
                            {
                                icon: Clock,
                                title: "스마트 시간 관리",
                                description: "진료 외 시간을 효율적으로 관리하고 최적화하여 추가 수익원을 창출합니다.",
                                colorClass: "service-green"
                            },
                            {
                                icon: TrendingUp,
                                title: "수익 최적화",
                                description: "데이터 기반의 전략적 접근으로 병원의 수익성을 극대화하고 지속 성장을 보장합니다.",
                                colorClass: "service-purple"
                            }
                        ].map((service, idx) => (
                            <AnimatedSection key={idx} id={`service-${idx}`} delay={idx * 200}>
                                <div className={`service-card ${service.colorClass}`}>
                                    <div className="service-glow" />
                                    <div className="service-content">
                                        <div className="service-icon-container">
                                            <service.icon className="service-icon" />
                                        </div>
                                        <h3 className="service-title">{service.title}</h3>
                                        <p className="service-description">{service.description}</p>

                                        <div className="service-link">
                                            <span>자세히 보기</span>
                                            <ArrowRight className="service-arrow" />
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="features-background" />
                <div className="features-pattern" />

                <div className="container">
                    <AnimatedSection id="features-title">
                        <div className="section-header">
                            <h2 className="features-title">
                                왜 <span className="features-accent">Team6</span>인가요?
                            </h2>
                            <p className="features-subtitle">
                                업계 최고의 전문성과 검증된 기술력으로 여러분의 성공을 보장합니다
                            </p>
                        </div>
                    </AnimatedSection>

                    <div className="features-content">
                        <AnimatedSection id="features-list">
                            <div className="features-list">
                                {[
                                    {
                                        icon: Users,
                                        title: "의료 전문가 팀",
                                        description: "10년+ 경험의 의료 데이터 전문가들이 직접 컨설팅하고 전략을 수립합니다.",
                                        colorClass: "feature-blue"
                                    },
                                    {
                                        icon: Shield,
                                        title: "보안과 신뢰성",
                                        description: "의료 데이터의 보안과 개인정보 보호를 최우선으로 하는 검증된 시스템을 제공합니다.",
                                        colorClass: "feature-green"
                                    },
                                    {
                                        icon: Award,
                                        title: "검증된 성과",
                                        description: "150+ 병원과의 파트너십을 통해 검증된 수익 증대와 효율성 개선 사례를 보유하고 있습니다.",
                                        colorClass: "feature-purple"
                                    }
                                ].map((feature, idx) => (
                                    <div key={idx} className={`feature-item ${feature.colorClass}`}>
                                        <div className="feature-icon-container">
                                            <feature.icon className="feature-icon" />
                                        </div>
                                        <div className="feature-text">
                                            <h3 className="feature-title">{feature.title}</h3>
                                            <p className="feature-description">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>

                        <AnimatedSection id="features-visual" delay={300}>
                            <div className="dashboard-container">
                                <div className="dashboard-glow" />
                                <div className="dashboard">

                                    {/* Dashboard mockup */}
                                    <div className="dashboard-content">
                                        <div className="dashboard-header">
                                            <div className="window-controls">
                                                <div className="control red" />
                                                <div className="control yellow" />
                                                <div className="control green" />
                                            </div>
                                            <div className="dashboard-title">Team6 Analytics Dashboard</div>
                                        </div>

                                        <div className="metrics">
                                            {[
                                                { label: "월별 수익 증가율", value: "+32%", progress: 80, colorClass: "metric-blue" },
                                                { label: "데이터 활용도", value: "89%", progress: 89, colorClass: "metric-green" },
                                                { label: "환자 만족도", value: "95%", progress: 95, colorClass: "metric-purple" }
                                            ].map((metric, idx) => (
                                                <div key={idx} className="metric-card">
                                                    <div className="metric-header">
                                                        <span className="metric-label">{metric.label}</span>
                                                        <span className="metric-value">{metric.value}</span>
                                                    </div>
                                                    <div className="progress-bar">
                                                        <div
                                                            className={`progress-fill ${metric.colorClass} ${isVisible['features-visual'] ? 'animate' : ''}`}
                                                            style={{ width: isVisible['features-visual'] ? `${metric.progress}%` : '0%' }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="notification-card">
                                                <div className="notification-header">
                                                    <Star className="notification-icon" />
                                                    <span className="notification-title">실시간 알림</span>
                                                </div>
                                                <p className="notification-text">새로운 수익 기회가 감지되었습니다. 예상 증가율: +15%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-background" />

                <div className="container">
                    <AnimatedSection id="cta">
                        <div className="cta-container">
                            <h2 className="cta-title">
                                <span className="cta-gradient">혁신의 시작</span>
                            </h2>
                            <p className="cta-description">
                                Team6과 함께 의료 데이터의 새로운 가능성을 발견하고,
                                진료 외 시간을 수익으로 전환하는 여정을 시작하세요.
                            </p>

                            <div className="cta-buttons">
                                <button className="cta-primary">
                                    <div className="button-shine" />
                                    <span className="button-content">
                    <Sparkles className="button-icon" />
                    무료 상담 신청
                  </span>
                                </button>

                                <button className="cta-secondary">
                  <span className="button-content">
                    <Database className="button-icon" />
                    서비스 둘러보기
                  </span>
                                </button>
                            </div>

                            <div className="cta-features">
                                <div className="cta-feature">
                                    <Shield className="cta-feature-icon" />
                                    <span>100% 보안</span>
                                </div>
                                <div className="cta-feature">
                                    <Clock className="cta-feature-icon" />
                                    <span>24/7 지원</span>
                                </div>
                                <div className="cta-feature">
                                    <Award className="cta-feature-icon" />
                                    <span>검증된 성과</span>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-background" />

                <div className="container">
                    <div className="footer-content">
                        <h3 className="footer-logo">
                            Team<span className="footer-accent">6</span>
                        </h3>
                        <p className="footer-description">의료 데이터로 새로운 수익을 창출하세요</p>

                        <div className="footer-links">
                            <span>© 2025 Team6. All rights reserved.</span>
                            <div className="footer-dot" />
                            <span>Privacy Policy</span>
                            <div className="footer-dot" />
                            <span>Terms of Service</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;