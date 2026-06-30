import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import SiteHeader from '../components/layout/SiteHeader'
import PageHero from '../components/layout/PageHero'
import PillButton from '../components/ui/PillButton'
import { COMPANY, WHATSAPP_LINK } from '../data/constants'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <SiteHeader />
      <PageHero
        title="Get In Touch"
        subtitle="Tell us about your project — our engineering team responds within 24 hours."
        breadcrumb="Contact"
        image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80"
      />

      <section className="py-20 px-4">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-ind-black">Contact Information</h2>
            <p className="mt-2 text-grey-dark">
              Reach out for quotations, technical consultations, or project enquiries.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ind-orange/10">
                  <MapPin size={18} className="text-ind-orange" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Address</p>
                  <p className="text-sm text-grey-dark">{COMPANY.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ind-orange/10">
                  <Phone size={18} className="text-ind-orange" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Phone</p>
                  <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="text-sm text-grey-dark hover:text-ind-orange">
                    {COMPANY.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ind-orange/10">
                  <Mail size={18} className="text-ind-orange" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Email</p>
                  <a href={`mailto:${COMPANY.email}`} className="text-sm text-grey-dark hover:text-ind-orange">
                    {COMPANY.email}
                  </a>
                </div>
              </li>
            </ul>

            <PillButton href={WHATSAPP_LINK} className="mt-8">
              Chat on WhatsApp
            </PillButton>
          </div>

          <div className="rounded-2xl border border-border-light bg-white p-8">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ind-orange/10">
                  <Send size={24} className="text-ind-orange" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold">Message Sent!</h3>
                <p className="mt-2 text-sm text-grey-dark">
                  Our team will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-semibold">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-border-light px-4 py-3 text-sm outline-none focus:border-ind-orange"
                    placeholder="Your name"
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-semibold">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-border-light px-4 py-3 text-sm outline-none focus:border-ind-orange"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1 block text-sm font-semibold">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-xl border border-border-light px-4 py-3 text-sm outline-none focus:border-ind-orange"
                      placeholder="+91"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="mb-1 block text-sm font-semibold">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-border-light px-4 py-3 text-sm outline-none focus:border-ind-orange"
                    placeholder="Describe your equipment requirements..."
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-ind-orange py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ind-orange-hover"
                >
                  Send Enquiry
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
