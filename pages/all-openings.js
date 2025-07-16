import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';

const jobList = [
  {
    id: 1,
    title: 'Web Developer',
    category: 'Development',
    type: 'Full Time',
    location: 'Remote',
    experience: 'Mid to Senior',
    industry: 'IT Services / Digital Agency / SaaS',
    details: {
      about: 'We are seeking a talented Web Developer to join our fully remote team. You will be responsible for developing, maintaining, and optimizing responsive websites and web applications. The ideal candidate is a proactive problem solver with strong front-end and back-end development skills and a passion for delivering exceptional user experiences.',
      responsibilities: [
        'Develop responsive websites and web applications using HTML, CSS, JavaScript, and modern frameworks.',
        'Build custom themes, templates, or plugins for CMS platforms like WordPress, Shopify, or custom-built systems.',
        'Collaborate with UX designers and backend developers to implement user-friendly interfaces and optimize workflows.',
        'Participate in code reviews, identify and fix bugs, and implement fixes.',
        'Integrate RESTful APIs and other third-party services.',
        'Maintain high standards for code quality and best practices.',
        'Utilize modern development workflows including version control (Git), code reviews, and CI/CD pipelines.'
      ],
      requirements: [
        '3+ years of experience in web development (Front-end, Back-end, or Full-stack)',
        'Strong proficiency in HTML5, CSS3, JavaScript (ES6+)',
        'Experience with one or more JavaScript frameworks (React, Vue.js, or Angular)',
        'Experience with back-end languages like PHP, Node.js, or Python',
        'Knowledge of relational databases (MySQL/PostgreSQL) and NoSQL databases',
        'Familiarity with Git and version control systems',
        'Solid understanding of responsive design and adaptive design principles',
        'Experience with WordPress custom theme/plugin building is a plus',
        'Ability to work independently in a remote environment',
        'Excellent communication and collaboration skills'
      ],
      preferred: [
        'Familiarity with Jamstack architectures (Netlify, Gatsby, Netlify, etc.)',
        'Experience with headless CMS (Strapi, Contentful, etc.)',
        'Knowledge of SEO best practices',
        'Familiarity with testing frameworks (Jest, Mocha, etc.)',
        'Exposure to cloud services (AWS, Firebase, Vercel, etc.)'
      ],
      benefits: [
        'Work from anywhere, flexible hours',
        'Comprehensive compensation based on experience',
        'Paid time off and local holidays',
        'Opportunity to work with global clients and latest technologies',
        'Collaborative and welcoming remote culture'
      ],
      howToApply: 'Please submit your resume, portfolio/GitHub link, and a brief cover letter detailing your experience and why you are a great fit for this role.'
    }
  },
  {
    id: 2,
    title: 'Data Analyst',
    category: 'Analytics',
    type: 'Full Time',
    location: 'Remote',
    experience: 'Junior to Mid',
    industry: 'Analytics / SaaS',
    details: {
      about: 'Join our analytics team to help clients unlock insights from their data. You will work with large datasets, build dashboards, and support business intelligence initiatives.',
      responsibilities: [
        'Analyze large datasets to identify trends and actionable insights.',
        'Build and maintain dashboards and reports.',
        'Collaborate with business stakeholders to define data requirements.',
        'Support data cleaning and transformation processes.'
      ],
      requirements: [
        '1+ years of experience in data analysis or business intelligence',
        'Proficiency in SQL and Excel',
        'Experience with BI tools (Power BI, Tableau, etc.)',
        'Strong analytical and problem-solving skills'
      ],
      preferred: [
        'Experience with Python or R',
        'Knowledge of statistics and data modeling'
      ],
      benefits: [
        'Remote work',
        'Flexible hours',
        'Learning and development opportunities'
      ],
      howToApply: 'Submit your resume and a brief cover letter explaining your interest in analytics.'
    }
  },
  {
    id: 3,
    title: 'AI ML Engineer',
    category: 'AI/ML',
    type: 'Full Time',
    location: 'Remote',
    experience: 'Mid to Senior',
    industry: 'AI / SaaS',
    details: {
      about: 'Work on cutting-edge AI and ML projects, building models and deploying them to production.',
      responsibilities: [
        'Design, build, and deploy machine learning models.',
        'Collaborate with data scientists and engineers.',
        'Optimize model performance and scalability.'
      ],
      requirements: [
        '2+ years of experience in AI/ML',
        'Proficiency in Python and ML libraries (scikit-learn, TensorFlow, PyTorch)',
        'Experience with cloud ML platforms'
      ],
      preferred: [
        'Experience with NLP or computer vision',
        'Knowledge of MLOps best practices'
      ],
      benefits: [
        'Remote work',
        'Competitive salary',
        'Opportunity to work on innovative projects'
      ],
      howToApply: 'Send your resume and a cover letter describing your AI/ML experience.'
    }
  },
  {
    id: 4,
    title: 'Agentc AI Tools Expert',
    category: 'AI/ML',
    type: 'Contract',
    location: 'Remote',
    experience: 'Senior',
    industry: 'AI / SaaS',
    details: {
      about: 'Lead the development and integration of Agentc AI tools for enterprise clients.',
      responsibilities: [
        'Develop and integrate Agentc AI tools.',
        'Work with enterprise clients to customize solutions.',
        'Provide technical leadership and support.'
      ],
      requirements: [
        '5+ years of experience in AI/ML',
        'Experience with Agentc AI tools',
        'Strong client communication skills'
      ],
      preferred: [
        'Experience in enterprise SaaS',
        'Project management skills'
      ],
      benefits: [
        'Remote contract',
        'High-impact projects',
        'Flexible schedule'
      ],
      howToApply: 'Apply with your resume and a summary of relevant Agentc AI projects.'
    }
  }
];

const categories = ['All Job Category', 'Development', 'Analytics', 'AI/ML'];
const types = ['All Job Type', 'Full Time', 'Contract'];
const locations = ['All Job Location', 'Remote', 'On-site'];

export default function AllOpenings() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [type, setType] = useState(types[0]);
  const [location, setLocation] = useState(locations[0]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', cover: '', file: null });

  const filteredJobs = jobList.filter(job => {
    return (
      (category === 'All Job Category' || job.category === category) &&
      (type === 'All Job Type' || job.type === type) &&
      (location === 'All Job Location' || job.location === location) &&
      (search === '' || job.title.toLowerCase().includes(search.toLowerCase()))
    );
  });

  function handleFormChange(e) {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    alert('Application submitted!');
    setForm({ name: '', email: '', phone: '', cover: '', file: null });
  }

  return (
    <div className="font-sans bg-white min-h-screen">
      <Header />
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6">
            <div className="text-pink-600 text-2xl font-bold flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl">&#11044;</span> Current Openings <span className="text-3xl">&#11044;</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-2">Check Openings remote/on-site <span className="text-pink-600">Express Analytics</span></h1>
            <p className="text-gray-700 mb-6">An opportunity to work on cutting edge technologies across <b>Data Analytics</b> and <b>Gen-AI/Agentic-AI</b> ecosystems.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
              <input type="text" placeholder="Search" className="border rounded px-4 py-2 w-full md:w-60" value={search} onChange={e => setSearch(e.target.value)} />
              <select className="border rounded px-4 py-2 w-full md:w-52" value={category} onChange={e => setCategory(e.target.value)}>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
              <select className="border rounded px-4 py-2 w-full md:w-52" value={type} onChange={e => setType(e.target.value)}>
                {types.map(t => <option key={t}>{t}</option>)}
              </select>
              <select className="border rounded px-4 py-2 w-full md:w-52" value={location} onChange={e => setLocation(e.target.value)}>
                {locations.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <div className="grid gap-6">
            {filteredJobs.map(job => (
              <div key={job.id} className="bg-white border rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="text-pink-700 text-lg font-bold mb-1 cursor-pointer hover:underline" onClick={() => setSelectedJob(job)}>{job.title}</div>
                  <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-2">
                    <span>{job.category}</span>
                    <span>{job.type}</span>
                    <span>{job.location}</span>
                    <span className="underline cursor-pointer" onClick={() => setSelectedJob(job)}>More Details &rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Job Details Modal */}
          {selectedJob && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setSelectedJob(null)}>
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full relative flex flex-col md:flex-row gap-8" style={{ height: '90vh', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
                <div className="flex-1 min-w-0">
                  <div className="text-pink-700 text-2xl font-bold mb-2">{selectedJob.title}</div>
                  <div className="mb-2 text-sm text-gray-700">
                    <b>Location:</b> {selectedJob.location} <br />
                    <b>Job Type:</b> {selectedJob.type} <br />
                    <b>Experience Level:</b> {selectedJob.experience} <br />
                    <b>Industry:</b> {selectedJob.industry}
                  </div>
                  <div className="mb-4 text-gray-700">
                    <b>About the Role</b>
                    <div className="text-sm">{selectedJob.details.about}</div>
                  </div>
                  <div className="mb-4 text-gray-700">
                    <b>Key Responsibilities</b>
                    <ul className="list-disc pl-6 text-sm">
                      {selectedJob.details.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                  <div className="mb-4 text-gray-700">
                    <b>Requirements</b>
                    <ul className="list-disc pl-6 text-sm">
                      {selectedJob.details.requirements.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                  {selectedJob.details.preferred && (
                    <div className="mb-4 text-gray-700">
                      <b>Preferred Qualifications</b>
                      <ul className="list-disc pl-6 text-sm">
                        {selectedJob.details.preferred.map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
                    </div>
                  )}
                  <div className="mb-4 text-gray-700">
                    <b>Benefits</b>
                    <ul className="list-disc pl-6 text-sm">
                      {selectedJob.details.benefits.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                  <div className="mb-4 text-gray-700">
                    <b>How to Apply</b>
                    <div className="text-sm">{selectedJob.details.howToApply}</div>
                  </div>
                </div>
                {/* Application Form */}
                <div className="flex-1 min-w-0 bg-gray-50 rounded-xl p-6">
                  <div className="text-pink-700 text-lg font-bold mb-4">Apply for this position</div>
                  <form className="space-y-4" onSubmit={handleFormSubmit}>
                    <div>
                      <label className="block text-sm font-semibold mb-1">Full Name *</label>
                      <input type="text" name="name" required className="w-full border rounded px-3 py-2" value={form.name} onChange={handleFormChange} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">Email *</label>
                      <input type="email" name="email" required className="w-full border rounded px-3 py-2" value={form.email} onChange={handleFormChange} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">Phone *</label>
                      <input type="text" name="phone" required className="w-full border rounded px-3 py-2" value={form.phone} onChange={handleFormChange} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">Cover Letter *</label>
                      <textarea name="cover" required className="w-full border rounded px-3 py-2" rows={4} value={form.cover} onChange={handleFormChange}></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">Upload CV/Resume *</label>
                      <input type="file" name="file" required accept=".pdf,.doc,.docx" className="w-full" onChange={handleFormChange} />
                      <div className="text-xs text-gray-500 mt-1">Allowed types: pdf, doc, docx.</div>
                    </div>
                    <div>
                      <label className="inline-flex items-center">
                        <input type="checkbox" required className="mr-2" />
                        <span className="text-xs">By using this form you agree with the storage and handling of your data by this website.</span>
                      </label>
                    </div>
                    <button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold px-6 py-3 rounded-xl shadow transition">Submit</button>
                  </form>
                </div>
                <button className="absolute top-2 right-2 text-gray-400 hover:text-pink-600 text-2xl font-bold" onClick={() => setSelectedJob(null)} aria-label="Close job details">&times;</button>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
