import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, Calendar, MapPin, Users, Mail, User, Info, FileText } from "lucide-react";
import { BookingInquiry } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface BookingFormProps {
  selectedEventType: string;
}

export default function BookingForm({ selectedEventType }: BookingFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<BookingInquiry>({
    name: "",
    email: "",
    date: "",
    location: "",
    eventType: "Corporate",
    guestsCount: "Gala (50–150 Guests)",
    additionalDetails: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pastInquiries, setPastInquiries] = useState<BookingInquiry[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Keep event type in sync if preset is selected from experiences
  useEffect(() => {
    if (selectedEventType) {
      // Find matching type based on experience title select
      if (selectedEventType.includes("PRIVATE")) {
        setFormData((prev) => ({ ...prev, eventType: "Private" }));
      } else if (selectedEventType.includes("CORPORATE")) {
        setFormData((prev) => ({ ...prev, eventType: "Corporate" }));
      } else if (selectedEventType.includes("THEATRE") || selectedEventType.includes("FESTIVALS")) {
        setFormData((prev) => ({ ...prev, eventType: "Stage" }));
      }
    }
  }, [selectedEventType]);

  // Load bookings from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("gleb_ts_bookings");
      if (stored) {
        setPastInquiries(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: "9ef5438a-4448-4ca3-9fb1-a2c8cb9c264b",
          subject: `New Event Inquiry: ${formData.eventType} from ${formData.name}`,
          from_name: "Gleb Tsarev Magic Website",
          name: formData.name,
          email: formData.email,
          date: formData.date || "TBD",
          location: formData.location || "TBD",
          "Event Format": formData.eventType,
          "Approximate Attendance": formData.guestsCount,
          message: formData.additionalDetails || "No additional details provided."
        })
      });

      const resData = await response.json();
      if (resData.success) {
        setIsSubmitted(true);
        const updatedList = [formData, ...pastInquiries];
        setPastInquiries(updatedList);
        try {
          localStorage.setItem("gleb_ts_bookings", JSON.stringify(updatedList));
        } catch {
          // ignore
        }
      } else {
        setSubmitError(resData.message || "Failed to submit booking inquiry. Please check your credentials or try again.");
      }
    } catch (error) {
      console.error("Web3Forms submission error:", error);
      setSubmitError("Network connection error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      date: "",
      location: "",
      eventType: "Corporate",
      guestsCount: "Gala (50–150 Guests)",
      additionalDetails: "",
    });
    setSubmitError(null);
    setIsSubmitted(false);
  };

  const getEventName = (key: string) => {
    switch (key) {
      case "Corporate":
        return t("optCorporate");
      case "Private":
        return t("optPrivate");
      case "Stage":
        return t("optStage");
      default:
        return t("optCustom");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative z-10 my-12">
      
      {/* Left panel: Context, guidelines */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
        <div>
          <h3 className="font-display text-2xl md:text-3xl text-white uppercase tracking-wider mb-4 font-bold">
            {t("formIntroTitle")}
          </h3>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6 font-sans">
            {t("formIntroDesc")}
          </p>

          <div className="space-y-4 border-t border-white/5 pt-6">
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#60A5FA] font-bold">{t("formDetailsHeading")}</h4>
            <ul className="space-y-3 font-mono text-xs uppercase tracking-wider text-zinc-300">
              <li className="flex items-center gap-2">
                <span className="text-blue-500">•</span>
                <span>{t("detailsDate")}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">•</span>
                <span>{t("detailsLocation")}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">•</span>
                <span>{t("detailsType")}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">•</span>
                <span>{t("detailsGuests")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 text-zinc-450 text-sm font-sans leading-relaxed">
          <p>{t("formTailoredNote")}</p>
        </div>
      </div>

      {/* Right panel: Contact Form itself */}
      <div className="lg:col-span-7">
        <div className="card-blur rounded-2xl p-6 md:p-8 border border-white/5 bg-zinc-950/40 backdrop-blur-xl relative">
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form-contact"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase block">{t("labelName")}</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-zinc-600" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("placeholderName")}
                        className="w-full bg-black/60 border border-white/10 focus:border-blue-500 rounded px-3 py-2 pl-9 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase block">{t("labelEmail")}</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 w-4 h-4 text-zinc-600" />
                      <input
                        type="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("placeholderEmail")}
                        className="w-full bg-black/60 border border-white/10 focus:border-blue-500 rounded px-3 py-2 pl-9 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all font-sans"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Target Date */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase block">{t("labelDate")}</label>
                    <div className="relative font-mono">
                      <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-zinc-650" />
                      <input
                        type="text"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        placeholder={t("placeholderDate")}
                        className="w-full bg-black/60 border border-white/10 focus:border-blue-500 rounded px-3 py-2 pl-9 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all uppercase placeholder:normal-case h-9"
                      />
                    </div>
                  </div>

                  {/* Venue Location */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase block">{t("labelLocation")}</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-zinc-650" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder={t("placeholderLocation")}
                        className="w-full bg-black/60 border border-white/10 focus:border-blue-500 rounded px-3 py-2 pl-9 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Event Type dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase block">{t("labelFormat")}</label>
                    <div className="relative">
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full bg-black/80 border border-white/10 focus:border-blue-500 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all cursor-pointer select-none"
                      >
                        <option value="Corporate">{t("optCorporate")}</option>
                        <option value="Private">{t("optPrivate")}</option>
                        <option value="Stage">{t("optStage")}</option>
                        <option value="Custom">{t("optCustom")}</option>
                      </select>
                    </div>
                  </div>

                  {/* Guest count dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase block">{t("labelAttendance")}</label>
                    <div className="relative">
                      <select
                        name="guestsCount"
                        value={formData.guestsCount}
                        onChange={handleChange}
                        className="w-full bg-black/80 border border-white/10 focus:border-blue-500 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all cursor-pointer select-none"
                      >
                        <option value="Сlose-Up (Up to 20 Guests)">Сlose-Up (Up to 20 Guests)</option>
                        <option value="Private (20–50 Guests)">Private (20–50 Guests)</option>
                        <option value="Gala (50–150 Guests)">Gala (50–150 Guests)</option>
                        <option value="Stage (150–500 Guests)">Stage (150–500 Guests)</option>
                        <option value="Festival (500+ Guests)">Festival (500+ Guests)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional Details Textarea */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase block">{t("labelTextarea")}</label>
                  <div className="relative">
                    <textarea
                      name="additionalDetails"
                      value={formData.additionalDetails}
                      onChange={handleChange}
                      rows={4}
                      placeholder={t("placeholderTextarea")}
                      className="w-full bg-black/60 border border-white/10 focus:border-blue-500 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 bg-red-500/10 border border-red-500/20 rounded font-mono text-xs text-red-400 flex items-start gap-2"
                  >
                    <span className="text-red-500 select-none">•</span>
                    <span>{submitError}</span>
                  </motion.div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white hover:bg-neutral-200 disabled:bg-neutral-800 text-black font-semibold text-xs uppercase tracking-[3px] rounded transition-all duration-300 shadow-md shadow-white/5 active:scale-98 flex items-center justify-center gap-2 cursor-pointer border border-transparent hover:scale-[1.01]"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                      />
                      <span>{t("buttonContacting")}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{t("buttonContact")}</span>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="form-completion"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-10 flex flex-col items-center justify-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-display text-lg md:text-xl text-white uppercase tracking-wider font-semibold">
                  {t("successSecured")}
                </h4>
                <div className="text-zinc-400 text-xs md:text-sm max-w-sm mx-auto leading-relaxed space-y-4">
                  <p>
                    {t("successP1").replace("{name}", formData.name).replace("{eventType}", getEventName(formData.eventType))}
                  </p>
                  <p className="text-zinc-550 text-xs italic font-mono pt-2">
                    {t("successP2").replace("{email}", formData.email)}
                  </p>
                </div>
                
                <button
                  id="reset-form-btn"
                  onClick={resetForm}
                  className="px-6 py-2.5 border border-white/10 hover:border-white/25 hover:bg-white/5 text-zinc-400 hover:text-white text-2xs uppercase tracking-widest font-mono rounded transition-colors"
                >
                  {t("btnSendAnother")}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Local Booking Portal - Live inquiry tracker for client review */}
        {pastInquiries.length > 0 && (
          <div className="mt-8 pt-6 border-t border-white/5 font-mono">
            <div className="flex items-center gap-1.5 mb-4 text-xs text-zinc-500 uppercase tracking-widest">
              <FileText className="w-3.5 h-3.5" />
              <span>{t("fileHistories").replace("{count}", pastInquiries.length.toString())}</span>
            </div>
            
            <div className="space-y-3">
              {pastInquiries.slice(0, 3).map((inquiry, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-lg p-4 flex flex-col md:flex-row justify-between md:items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white uppercase tracking-wider">{inquiry.name}</span>
                      <span className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-mono font-semibold uppercase">{inquiry.eventType}</span>
                    </div>
                    <div className="text-[10px] text-zinc-550 mt-1 flex items-center gap-3">
                      <span className="flex items-center gap-1"><MapPin className="w-2.5 h-2.5" /> {inquiry.location || "TBD"}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-2.5 h-2.5" /> {inquiry.date || t("statusPlanning")}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <span className="w-1 px-1.5 bg-yellow-500/15 text-yellow-400 border border-yellow-500/20 text-[9px] font-semibold py-0.5 rounded flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-yellow-400 animate-ping inline-block mr-1" />
                      {t("statusInReview")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
