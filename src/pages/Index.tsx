import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Courses from '@/components/landing/Courses';
import Dashboard from '@/components/landing/Dashboard';
import LessonPlayer from '@/components/landing/LessonPlayer';
import AboutFaq from '@/components/landing/AboutFaq';
import Footer from '@/components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Courses />
        <Dashboard />
        <LessonPlayer />
        <AboutFaq />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
