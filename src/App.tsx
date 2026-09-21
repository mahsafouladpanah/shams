import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './pages/Home';
import { Knowledge } from './pages/Knowledge';
import { Diseases } from './pages/Diseases';
import { DiseaseDetail } from './pages/DiseaseDetail';
import { Lifestyle } from './pages/Lifestyle';
import { Sports } from './pages/Sports';
import { AgeGroups } from './pages/AgeGroups';
import { Assessment } from './pages/Assessment';
import { AssessmentFlow } from './pages/AssessmentFlow';
import { AssessmentResult } from './pages/AssessmentResult';
import { HealthTools } from './pages/HealthTools';
import { HealthRegistry } from './pages/HealthRegistry';
import { Dashboard } from './pages/Dashboard';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { About } from './pages/About';
import { Plan } from './pages/Plan';
import { Services } from './pages/Services';
import { HealthRecord } from './pages/HealthRecord';
import { ResearchPanel } from './pages/ResearchPanel';
import { Events } from './pages/Events';
import { EventDetail } from './pages/EventDetail';
import { Settings } from './pages/Settings';
import { MyEvents } from './pages/MyEvents';
import { Cart } from './pages/Cart';
import { Notifications } from './pages/Notifications';
import { Search } from './pages/Search';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {/* Direct & Alias Routes for Knowledge Pillars */}
          <Route path="lifestyle" element={<Lifestyle />} />
          <Route path="sports" element={<Sports />} />
          <Route path="age-groups" element={<AgeGroups />} />

          {/* Knowledge Section & Nested Subpages */}
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="knowledge/diseases" element={<Diseases />} />
          <Route path="knowledge/diseases/:id" element={<DiseaseDetail />} />
          <Route path="knowledge/lifestyle" element={<Lifestyle />} />
          <Route path="knowledge/sports" element={<Sports />} />
          <Route path="knowledge/age-groups" element={<AgeGroups />} />

          {/* Assessment Section & Tools */}
          <Route path="assessment" element={<Assessment />} />
          <Route path="assessment/tools" element={<HealthTools />} />
          <Route path="assessment/tools/:toolId" element={<HealthTools />} />
          <Route path="assessment/registry" element={<HealthRegistry />} />
          <Route path="assessment/result/:id" element={<AssessmentResult />} />

          {/* Health Program (Exclusively Green) */}
          <Route path="plan" element={<Plan />} />

          {/* Services Section */}
          <Route path="services" element={<Services />} />
          <Route path="services/record" element={<HealthRecord />} />
          <Route path="services/research" element={<ResearchPanel />} />
          
          {/* Shop & E-Commerce */}
          <Route path="shop" element={<Shop />} />
          <Route path="shop/product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />

          {/* Dashboard & Legacy Route Redirects */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/record" element={<HealthRecord />} />
          <Route path="dashboard/events" element={<MyEvents />} />

          {/* Auxiliary Pages */}
          <Route path="events" element={<Events />} />
          <Route path="events/:id" element={<EventDetail />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="search" element={<Search />} />

          {/* Dedicated 404 & Catch-all Route */}
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        
        {/* Full screen assessment flow */}
        <Route path="/assessment/flow/:id" element={<AssessmentFlow />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
