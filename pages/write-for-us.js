import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';

const topics = [
  'Data Visualization',
  'Large Language Models',
  'Artificial Intelligence',
  'AI Analytics',
  'Generative AI',
  'Machine Learning',
  'Propensity Modeling',
  'Data Analytics',
];

const guidelines = [
  'Min. blog word count should be 1200-2000 words',
  'The domain should have a minimum authority score of 35 and a spam score of less than 5%',
  'Include sources for statistics wherever possible',
  'Format headings, titles, and use suitable images or infographics',
  'Please don’t approach us for press releases',
  'Don’t send content/blog generated from any AI tools including ChatGPT',
  'Do proper research for the post and add actionable tips',
  'Don’t promote your services or products in blog',
  'We don’t encourage spammy content and inaccurate information',
  'The topic should be 100% original and unpublished',
];

const steps = [
  'Select a topic',
  'Submit your blog’s summary',
  'Get Approval and Published',
];

const whatHappens = [
  'Our editor will review your guest post request and decide whether it fits. Later, he will discuss it with his team.',
  'After receiving feedback from the team, our editor will return to you with notes.',
  'We will revise your article and send you the publication date.',
  'You will be notified after publishing your article',
];

export default function WriteForUs() {
  const [form, setForm] = useState({ name: '', email: '', headline: '', summary: '', bio: '', file: null });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', headline: '', summary: '', bio: '', file: null });
  }

  return (
    <div className="font-sans bg-white min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="w-full pt-16 pb-8 px-4 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="uppercase text-primary font-bold text-xs mb-2 tracking-widest">Write for Us</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-2">Yes. We are accepting guest posts.</h1>
          <p className="text-lg text-gray-700 mb-4">Share your knowledge and expertise, raise your voice, and establish yourself as a leader in the field by getting featured on Express Analytics.</p>
        </div>
      </section>
      {/* Steps Section */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6 text-primary">3 Steps to Publish Your Blog on Express Analytics</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            {steps.map((step, i) => (
              <div key={step} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-2">{i + 1}</div>
                <div className="text-lg font-semibold text-gray-800 text-center">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Guidelines Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary mb-4">Guidelines for Guest Posts</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {guidelines.map(g => <li key={g}>{g}</li>)}
          </ul>
        </div>
      </section>
      {/* Topics Section */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary mb-4">Topics we are looking for:</h2>
          <div className="flex flex-wrap gap-3">
            {topics.map(t => <span key={t} className="bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm">{t}</span>)}
          </div>
        </div>
      </section>
      {/* What Happens Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary mb-4">What happens when you send a blog for approval?</h2>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            {whatHappens.map((w, i) => <li key={i}>{w}</li>)}
          </ol>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 text-center bg-black rounded-2xl pt-10 pb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Ready to get published?</h2>
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gradient-main">Send your blog headline and summary to <a href="mailto:marketing@expressanalytics.net" className="underline">marketing@expressanalytics.net</a></h3>
        </div>
      </section>
      {/* Submission Form Section */}
      <section className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary mb-4 text-center">Submit Your Blog Idea</h2>
          {submitted ? (
            <div className="bg-green-100 text-green-800 rounded-xl p-6 text-center font-semibold">Thank you for your submission! We will review your idea and get back to you soon.</div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold mb-1">Name *</label>
                <input type="text" name="name" required className="w-full border rounded px-3 py-2" value={form.name} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Email *</label>
                <input type="email" name="email" required className="w-full border rounded px-3 py-2" value={form.email} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Blog Headline *</label>
                <input type="text" name="headline" required className="w-full border rounded px-3 py-2" value={form.headline} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Summary *</label>
                <textarea name="summary" required className="w-full border rounded px-3 py-2" rows={3} value={form.summary} onChange={handleChange}></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Author Bio *</label>
                <textarea name="bio" required className="w-full border rounded px-3 py-2" rows={2} value={form.bio} onChange={handleChange}></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Upload Draft (optional)</label>
                <input type="file" name="file" accept=".pdf,.doc,.docx" className="w-full" onChange={handleChange} />
                <div className="text-xs text-gray-500 mt-1">Allowed types: pdf, doc, docx.</div>
              </div>
              <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-xl shadow transition">Submit</button>
            </form>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
