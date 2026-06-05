import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "EN" | "LT" | "RU";

export const translations = {
  EN: {
    // Nav
    navAbout: "ABOUT",
    navExperiences: "EXPERIENCES",
    navBooking: "BOOKING",
    btnBookEvent: "BOOK A SHOW",
    btnScheduleEvent: "Schedule Event",
    mobileDeck: "THE INTERFACE DECK",
    
    // Hero
    worldChampion: "WORLD CHAMPION OF MAGIC",
    heroSubtitle: "Modern Illusion Experiences",
    btnBookAnEvent: "BOOK A SHOW",
    discover: "01 / DISCOVER",
    
    // About
    aboutTitle: "ABOUT",
    aboutP1: "GLEB TS is an award-winning Illusionist and multimedia performer based in Europe, creating modern illusion experiences for audiences around the world.",
    aboutP2: "Winner of the Special Award for the Most Original Close-Up Act at the FISM World Championship of Magic 2022.",
    aboutP3: "Member of The Magic Circle (United Kingdom) and the Academy of Magical Arts in Hollywood, two of the world's most prestigious magical organizations.",
    metricWorldChampion: "WORLD CHAMPION",
    metricFism: "FISM 2022",
    metricExperienceTime: "10+ YEARS",
    metricExperienceDesc: "Creating illusion experiences",
    metricAudienceTime: "150,000+",
    metricAudienceDesc: "Social media audience",
    
    // Experiences
    expTitle: "TAILORED EXPERIENCES",
    expSubtitle: "Modern magic designed specifically for your guests.",
    expCapacity: "CAPACITY",
    expFormat: "FORMAT",
    
    // Experience Cards
    privateTitle: "PRIVATE EVENTS",
    privateDesc: "Modern interactive magic performed directly among your guests. Every performance is adapted to the atmosphere, audience and format of your event.",
    privateSuitability: "10-60 VIPs",
    
    corporateTitle: "CORPORATE EVENTS",
    corporateDesc: "Professional illusion experiences for conferences, galas, receptions and brand events. Designed to engage audiences and create memorable moments.",
    corporateSuitability: "50-1200+ guests",
    
    theatreTitle: "THEATRE & FESTIVALS",
    theatreDesc: "Original stage performances combining illusion, storytelling and visual art. Created for theatres, festivals and special artistic projects.",
    theatreSuitability: "100-2500+ attendees",

    // Booking Section Header
    bookingTag: "ENGAGE THE MIRACLE",
    bookingTitle: "BOOKING",
    
    // Booking Form Left panel
    formIntroTitle: "Tell me about your event.",
    formIntroDesc: "Share anything you already know about your event. If you're still planning, that's perfectly fine.",
    formDetailsHeading: "Helpful details:",
    detailsDate: "Date",
    detailsLocation: "Location",
    detailsType: "Event Type",
    detailsGuests: "Approximate Number of Guests",
    formTailoredNote: "Every performance is tailored to your event, audience and atmosphere.",
    
    // Booking Form Fields
    labelName: "Your Name *",
    placeholderName: "e.g. Victor Hugo",
    labelEmail: "Email Address *",
    placeholderEmail: "e.g. victor@luxurybrands.co",
    labelDate: "Target Date",
    placeholderDate: "Mon 18 Nov, 2026 or TBD",
    labelLocation: "Event Venue / Location",
    placeholderLocation: "e.g. Vilnius, Lithuania or Geneva, CH",
    labelFormat: "Event Format",
    labelAttendance: "Approximate Attendance",
    labelTextarea: "Event Context & Narrative (Optional)",
    placeholderTextarea: "Share a short sentence describing the atmosphere, theme, or any hidden desires you have for Gleb's mind-bending illusion design...",
    buttonContacting: "CONTACTING...",
    buttonContact: "CONTACT",
    
    // Success State
    successSecured: "INQUIRY SECURED",
    successP1: "Thank you, {name}. Your performance inquiry file for a {eventType} has been registered directly.",
    successP2: "A private coordinator will review availability and contact you at {email} within 24 hours.",
    btnSendAnother: "Send another request",
    
    // Dropdown Form values (Formats)
    optCorporate: "Corporate Event / Conference",
    optPrivate: "Private Event / celebration",
    optStage: "Theatre / Festival / Stage Production",
    optCustom: "Custom Creative Partnership",
    
    // Live tracker
    fileHistories: "YOUR REGISTERED FILE HISTORIES ({count})",
    statusInReview: "IN REVIEW",
    statusPlanning: "Early planning",
    
    // Footer
    footerMantra: "A WORLD BEHIND THE WORLD",
    footerQuote: "There is always more than meets the eye.",
    footerRights: "ALL RIGHTS RESERVED.",
    
    // Portrait component
    lblIllusionist: "ILLUSIONIST",
    lblJackOfSpades: "JACK_OF_SPADES [J♠]",
    lblTouch: "TOUCH",
    textGone: "Gone.",
    textOrIsIt: "Or is it?"
  },
  LT: {
    // Nav
    navAbout: "APIE",
    navExperiences: "PROGRAMOS",
    navBooking: "REZERVACIJA",
    btnBookEvent: "Užsakyti",
    btnScheduleEvent: "Užsakyti pasiūlymą",
    mobileDeck: "RŪMAI IR PILYS",
    
    // Hero
    worldChampion: "PASAULIO MAGIJOS ČEMPIONAS",
    heroSubtitle: "Šiuolaikinės iliuzijos patirtys",
    btnBookAnEvent: "UŽSAKYTI PASIRODYMĄ",
    discover: "01 / ĮŽANGA",
    
    // About
    aboutTitle: "APIE",
    aboutP1: "GLEB TS yra Pasaulio magijos čempionato prizininkas, iliuzionistas ir multimedijos menininkas, kuriantis šiuolaikinės magijos programas žiūrovams visame pasaulyje.",
    aboutP2: "Pasaulio magijos čempionate „FISM 2022“ apdovanotas specialiuoju prizu už originaliausią mikromagijos (Close-Up) programą.",
    aboutP3: "Prestižiškiausių pasaulio magų asociacijų – „The Magic Circle“ (Didžioji Britanija) bei „Academy of Magical Arts“ Holivude – narys.",
    metricWorldChampion: "PASAULIO ČEMPIONAS",
    metricFism: "FISM 2022",
    metricExperienceTime: "10+ METŲ",
    metricExperienceDesc: "Iliuzijos meno patirtis",
    metricAudienceTime: "150 000+",
    metricAudienceDesc: "Auditorija socialiniuose tinkluose",
    
    // Experiences
    expTitle: "INDIVIDUALIOS PROGRAMOS",
    expSubtitle: "Šiuolaikinė magija, sukurta specialiai jūsų svečiams.",
    expCapacity: "TALPA",
    expFormat: "FORMATAS",
    
    // Experience Cards
    privateTitle: "PRIVATŪS RENGINIAI",
    privateDesc: "Šiuolaikinė interaktyvi magija tiesiogiai tarp jūsų svečių. Kiekvienas pasirodymas pritaikomas prie jūsų vakaro atmosferos, auditorijos ir formato.",
    privateSuitability: "10-60 VIP asmenų",
    
    corporateTitle: "KORPORATYVINIAI RENGINIAI",
    corporateDesc: "Profesionalios iliuzijų programos konferencijoms, gala vakarams, priėmimams ir prekių ženklų renginiams.",
    corporateSuitability: "50-1200+ svečių",
    
    theatreTitle: "TEATRAS & FESTIVALIAI",
    theatreDesc: "Originalūs scenos pasirodymai, apjungiantys iliuzijos meną, vaizdo projekcijas bei istorijų pasakojimą. Sukurta teatrams, festivaliams ir specialiesiems meno projektams.",
    theatreSuitability: "100-2500+ žiūrovų",

    // Booking Section Header
    bookingTag: "PRISILIESKITE PRIE STEBUKLO",
    bookingTitle: "REZERVACIJA",
    
    // Booking Form Left panel
    formIntroTitle: "PAPASAKOKITE APIE SAVO RENGINĮ.",
    formIntroDesc: "Pasidalykite tuo, ką jau žinote apie savo šventę. Jei renginio planavimas dar tik prasideda – nieko tokio.",
    formDetailsHeading: "Naudingos detalės:",
    detailsDate: "Data",
    detailsLocation: "Vieta / Miestas",
    detailsType: "Renginio formatas",
    detailsGuests: "Planuojamas svečių skaičius",
    formTailoredNote: "Kiekvienas pasirodymas kuriamas individualiai jūsų renginiui, auditorijai ir atmosferai.",
    
    // Booking Form Fields
    labelName: "Jūsų vardas *",
    placeholderName: "pvz. Victor Hugo",
    labelEmail: "El. pašto adresas *",
    placeholderEmail: "pvz. victor@luxurybrands.co",
    labelDate: "Numatyta data",
    placeholderDate: "Pvz. 2026 m. lapkričio 18 d. arba tikslinama",
    labelLocation: "Renginio vieta",
    placeholderLocation: "pvz. Vilnius, Lietuva arba Ženeva, CH",
    labelFormat: "Renginio formatas",
    labelAttendance: "Svečių skaičius",
    labelTextarea: "Renginio kontekstas (Neprivaloma)",
    placeholderTextarea: "Pasidalinkite trumpu sakiniu apie atmosferą, temą ar jūsų pageidavimus Gleb magijos šou dizainui...",
    buttonContacting: "SIUNČIAMA...",
    buttonContact: "GAUTI PASIŪLYMĄ",
    
    // Success State
    successSecured: "REZERVACIJA UŽREGISTRUOTA",
    successP1: "Ačiū, {name}. Jūsų užklausa dėl pasirodymo ({eventType}) sėkmingai gauta.",
    successP2: "Asmeninis koordinatorius peržiūrės datą bei susisieks su jumis el. paštu {email} per 24 valandas.",
    btnSendAnother: "Siųsti kitą užklausą",
    
    // Dropdown Form values (Formats)
    optCorporate: "Korporatyvinis renginys / Konferencija",
    optPrivate: "Privatus renginys / Šventė",
    optStage: "Teatras / Festivalis / Scenos šou",
    optCustom: "Išskirtinis kūrybinis projektas",
    
    // Live tracker
    fileHistories: "JŪSŲ UŽREGISTRUOTOS UŽKLAUSOS ({count})",
    statusInReview: "PERŽIŪRIMA",
    statusPlanning: "Planavimo stadija",
    
    // Footer
    footerMantra: "A WORLD BEHIND THE WORLD",
    footerQuote: "There is always more than meets the eye.",
    footerRights: "VISOS TEISĖS SAUGOMOS.",
    
    // Portrait component
    lblIllusionist: "ILIUZIONISTAS",
    lblJackOfSpades: "PIKŲ VALETAS [V♠]",
    lblTouch: "PALIESK",
    textGone: "Dingo.",
    textOrIsIt: "Ar tikrai?"
  },
  RU: {
    // Nav
    navAbout: "ОБО МНЕ",
    navExperiences: "ПРОГРАММЫ",
    navBooking: "БРОНИРОВАНИЕ",
    btnBookEvent: "Получить предложение",
    btnScheduleEvent: "Получить предложение",
    mobileDeck: "НАВИГАЦИЯ САЙТА",
    
    // Hero
    worldChampion: "ЧЕМПИОН МИРА ПО МАГИИ",
    heroSubtitle: "Современные иллюзионные шоу",
    btnBookAnEvent: "ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ",
    discover: "01 / УЗНАТЬ БОЛЬШЕ",
    
    // About
    aboutTitle: "ОБО МНЕ",
    aboutP1: "— чемпион мира по магии, иллюзионист и мультимедийный артист, выступающий для зрителей по всему миру.",
    aboutP2: "Обладатель престижного специального приза за оригинальность (Special Award for the Most Original Close-Up Act) на Чемпионате мира по магии FISM 2022.",
    aboutP3: "Член старейшего британского общества The Magic Circle и голливудской Академии магических искусств (Academy of Magical Arts) — двух самых престижных иллюзионистских сообществ в мире.",
    metricWorldChampion: "ЧЕМПИОН МИРА",
    metricFism: "FISM 2022",
    metricExperienceTime: "10+ ЛЕТ",
    metricExperienceDesc: "опыта в магии",
    metricAudienceTime: "150 000+",
    metricAudienceDesc: "Аудитория в соцсеях",
    
    // Experiences
    expTitle: "УНИКАЛЬНЫЕ ПРОГРАММЫ",
    expSubtitle: "Современное искусство иллюзий, созданное специально для ваших гостей.",
    expCapacity: "ОБЪЁМ",
    expFormat: "ФОРМАТ",
    
    // Experience Cards
    privateTitle: "ЧАСТНЫЕ МЕРОПРИЯТИЯ",
    privateDesc: "Интерактивная микромагия прямо в руках ваших гостей. Каждое выступление адаптируется под атмосферу, аудиторию и тональность вашего вечера.",
    privateSuitability: "10-60 VIP-гостей",
    
    corporateTitle: "КОРПОРАТИВНЫЕ СОБЫТИЯ",
    corporateDesc: "Профессиональные иллюзионные шоу для конференций, гала-вечеров, презентаций брендов и приемов. Полное вовлечение гостей и создание уникальной атмосферы.",
    corporateSuitability: "50-1200+ гостей",
    
    theatreTitle: "ТЕАТРЫ И ФЕСТИВАЛИ",
    theatreDesc: "Оригинальные сценические спектакли, объединяющие магию, сторителлинг и визуальное искусство. Разработано для театров, фестивалей и специальных арт-проектов.",
    theatreSuitability: "100-2500+ зрителей",

    // Booking Section Header
    bookingTag: "ПРИКОСНИТЕСЬ К МАГИИ",
    bookingTitle: "БРОНИРОВАНИЕ",
    
    // Booking Form Left panel
    formIntroTitle: "Расскажите о вашем событии.",
    formIntroDesc: "Поделитесь деталями, которые уже известны. Если вы пока на стадии планирования – ничего страшного.",
    formDetailsHeading: "Полезная информация:",
    detailsDate: "Дата",
    detailsLocation: "Место проведения / Город",
    detailsType: "Формат выступления",
    detailsGuests: "Приблизительное число гостей",
    formTailoredNote: "Каждое шоу создается индивидуально под формат мероприятия, состав гостей и атмосферу.",
    
    // Booking Form Fields
    labelName: "Ваше имя *",
    placeholderName: "например, Виктор Гюго",
    labelEmail: "Электронная почта *",
    placeholderEmail: "например, victor@luxurybrands.co",
    labelDate: "Желаемая дата",
    placeholderDate: "Например, Пн 18 Ноября, 2026 или уточняется",
    labelLocation: "Место проведения",
    placeholderLocation: "например, Вильнюс, Литва или Женева, Швейцария",
    labelFormat: "Формат события",
    labelAttendance: "Количество гостей",
    labelTextarea: "Описание и контекст события (Необязательно)",
    placeholderTextarea: "Опишите атмосферу, тематику вечера или ваши пожелания к концепции иллюзионного шоу Глеба...",
    buttonContacting: "ОТПРАВКА...",
    buttonContact: "ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ",
    
    // Success State
    successSecured: "ЗАЯВКА ЗАРЕГИСТРИРОВАНА",
    successP1: "Спасибо, {name}. Ваша заявка на шоу ({eventType}) успешно зарегистрирована в нашей базе.",
    successP2: "Личный координатор проверит свободные даты и свяжется с вами по адресу {email} в течение 24 часов.",
    btnSendAnother: "Отправить еще одну заявку",
    
    // Dropdown Form values (Formats)
    optCorporate: "Корпоративное мероприятие / Конференция",
    optPrivate: "Частный праздник / Торжество",
    optStage: "Театральное / Фестивальное / Сценическое шоу",
    optCustom: "Эксклюзивное творческое партнерство",
    
    // Live tracker
    fileHistories: "ВАШИ ЗАРЕГИСТРИРОВАННЫЕ ЗАЯВКИ ({count})",
    statusInReview: "НА РАССМОТРЕНИИ",
    statusPlanning: "Стадия планирования",
    
    // Footer
    footerMantra: "A WORLD BEHIND THE WORLD",
    footerQuote: "There is always more than meets the eye.",
    footerRights: "ВСЕ ПРАВА ЗАЩИЩЕНЫ.",
    
    // Portrait component
    lblIllusionist: "ИЛЛЮЗИОНИСТ",
    lblJackOfSpades: "ПИКОВЫЙ ВАЛЕТ [В♠]",
    lblTouch: "НАЖМИ",
    textGone: "Исчез.",
    textOrIsIt: "Или нет?"
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.EN) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // 1. First choice: User stored preference in localStorage
    try {
      const saved = localStorage.getItem("gleb_ts_language");
      if (saved === "EN" || saved === "LT" || saved === "RU") {
        return saved;
      }
    } catch (e) {
      // Ignore localStorage read errors in restricted contexts
    }

    // Default fallback is English (disabled automatic browser language detection)
    return "EN";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("gleb_ts_language", lang);
    } catch (e) {
      // Ignore write errors
    }
  };

  const t = (key: keyof typeof translations.EN): string => {
    return translations[language][key] || translations.EN[key] || "";
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
