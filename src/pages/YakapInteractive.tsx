import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Search,
  Check,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  FileText,
  Activity,
  ShieldCheck,
  AlertCircle,
  Copy,
  Info,
  Calendar,
  Smartphone,
  UserCheck,
} from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { useTranslation } from '../hooks/useTranslation';

// 13 Outpatient Diagnostics list with layman's terms
const LAB_TESTS = [
  {
    id: 'cbc',
    name: 'Complete Blood Count (CBC) with Platelet Count',
    layDescription: 'Pagsusuri ng dugo para sa impeksyon, anemia, o dengue.',
    details:
      'Helps identify infection, anemia, bleeding disorders, and monitors platelet count for viral illnesses like dengue.',
  },
  {
    id: 'urinalysis',
    name: 'Urinalysis',
    layDescription: 'Pagsuri sa ihi para malaman kung may UTI o sakit sa bato.',
    details:
      'Screens for urinary tract infections (UTIs), kidney dysfunction, and early metabolic disorders.',
  },
  {
    id: 'fecalysis',
    name: 'Fecalysis',
    layDescription: 'Pagsusuri ng dumi para sa bulate o impeksyon sa tiyan.',
    details:
      'Detects digestive tract infections, parasites, amoebiasis, and signs of gastrointestinal issues.',
  },
  {
    id: 'fbs',
    name: 'Fasting Blood Sugar (FBS)',
    layDescription: 'Pagsuri ng sugar sa dugo para sa screening ng diabetes.',
    details:
      'Measures blood glucose levels after an 8-hour fast. Crucial for early detection of diabetes and pre-diabetes.',
  },
  {
    id: 'ogtt',
    name: 'Oral Glucose Tolerance Test (OGTT)',
    layDescription:
      'Advanced na pagsubok sa sugar, lalo na para sa mga buntis.',
    details:
      'Evaluates how your body processes sugar over time. Essential for prenatal screenings and advanced diabetes profiling.',
  },
  {
    id: 'hba1c',
    name: 'HbA1c (Glycated Hemoglobin)',
    layDescription: 'Average na sugar level sa loob ng nakalipas na 3 buwan.',
    details:
      'Provides a three-month average of blood sugar levels. Essential for monitoring long-term glycemic control in diabetic patients.',
  },
  {
    id: 'lipid',
    name: 'Lipid Profile',
    layDescription:
      'Sukat ng cholesterol at triglycerides (risko sa sakit sa puso).',
    details:
      'Measures total cholesterol, HDL (good cholesterol), LDL (bad cholesterol), and triglycerides to assess cardiovascular risk.',
  },
  {
    id: 'creatinine',
    name: 'Creatinine',
    layDescription: 'Pagsusuri sa kalusugan at function ng mga bato (kidney).',
    details:
      'Measures creatinine levels in the blood to screen for, evaluate, and monitor kidney disease or dysfunction.',
  },
  {
    id: 'ecg',
    name: 'Electrocardiogram (ECG)',
    layDescription: 'Pagsuri sa ritmo at tibok ng iyong puso.',
    details:
      'Records the electrical signals of your heart to check for abnormal heart rhythms, damage, or early cardiovascular disease.',
  },
  {
    id: 'xray',
    name: 'Chest X-ray',
    layDescription: 'Larawan ng baga para sa pneumonia o tuberculosis (TB).',
    details:
      'Screens for pulmonary infections, tuberculosis (TB), lung tumors, fluid accumulation, and cardiovascular enlargement.',
  },
  {
    id: 'sputum',
    name: 'Sputum Microscopy / GeneXpert',
    layDescription: 'Pagsuri ng plema para sa kumpirmasyon ng TB.',
    details:
      'Highly precise test analyzing phlegm to diagnose tuberculosis (TB) and determine drug-resistant strains.',
  },
  {
    id: 'pap',
    name: 'Pap Smear',
    layDescription: 'Screening ng cervix para sa pag-iwas sa cervical cancer.',
    details:
      'Saves lives through early screening and prevention of cervical cancer in women by detecting precancerous cell changes.',
  },
  {
    id: 'fobt',
    name: 'Fecal Occult Blood Test (FOBT)',
    layDescription:
      'Pagsuri kung may nakatagong dugo sa dumi (screen ng colon cancer).',
    details:
      'Checks for hidden blood in the stool, an important early screening tool for colon cancer and internal bleeding.',
  },
];

// Robust 75+ generic outpatient medicines database
const MEDICINE_DATABASE = [
  // Hypertension / High Blood (1-10)
  {
    generic: 'Amlodipine Besilate',
    strength: '5mg Tablet',
    category: 'Hypertension / High Blood',
    use: 'Pababa ng altapresyon at pampaluwag ng ugat sa puso.',
  },
  {
    generic: 'Amlodipine Besilate',
    strength: '10mg Tablet',
    category: 'Hypertension / High Blood',
    use: 'Pababa ng altapresyon at pampaluwag ng ugat sa puso.',
  },
  {
    generic: 'Losartan Potassium',
    strength: '50mg Tablet',
    category: 'Hypertension / High Blood',
    use: 'Pinipigilan ang pag-igting ng mga ugat para bumaba ang presyon.',
  },
  {
    generic: 'Losartan Potassium',
    strength: '100mg Tablet',
    category: 'Hypertension / High Blood',
    use: 'Pinipigilan ang pag-igting ng mga ugat para bumaba ang presyon.',
  },
  {
    generic: 'Metoprolol Tartrate',
    strength: '50mg Tablet',
    category: 'Hypertension / High Blood',
    use: 'Pampabagal ng mabilis na tibok ng puso at pampababa ng presyon.',
  },
  {
    generic: 'Metoprolol Tartrate',
    strength: '100mg Tablet',
    category: 'Hypertension / High Blood',
    use: 'Pampabagal ng mabilis na tibok ng puso at pampababa ng presyon.',
  },
  {
    generic: 'Enalapril Maleate',
    strength: '5mg Tablet',
    category: 'Hypertension / High Blood',
    use: 'ACE Inhibitor na pampababa ng presyon at proteksyon sa puso.',
  },
  {
    generic: 'Enalapril Maleate',
    strength: '20mg Tablet',
    category: 'Hypertension / High Blood',
    use: 'ACE Inhibitor na pampababa ng presyon at proteksyon sa puso.',
  },
  {
    generic: 'Hydrochlorothiazide',
    strength: '12.5mg Tablet',
    category: 'Hypertension / High Blood',
    use: 'Diuretic o pampaihi para bawasan ang labis na likido sa katawan.',
  },
  {
    generic: 'Hydrochlorothiazide',
    strength: '25mg Tablet',
    category: 'Hypertension / High Blood',
    use: 'Diuretic o pampaihi para bawasan ang labis na likido sa katawan.',
  },
  {
    generic: 'Clonidine Hydrochloride',
    strength: '75mcg Tablet',
    category: 'Hypertension / High Blood',
    use: 'Mabilisang pampababa ng presyon sa oras ng hypertensive crisis.',
  },
  {
    generic: 'Clonidine Hydrochloride',
    strength: '150mcg Tablet',
    category: 'Hypertension / High Blood',
    use: 'Mabilisang pampababa ng presyon sa oras ng hypertensive crisis.',
  },
  {
    generic: 'Carvedilol',
    strength: '6.25mg Tablet',
    category: 'Hypertension / High Blood',
    use: 'Beta-blocker para sa high blood at mahinang puso (heart failure).',
  },
  {
    generic: 'Carvedilol',
    strength: '25mg Tablet',
    category: 'Hypertension / High Blood',
    use: 'Beta-blocker para sa high blood at mahinang puso (heart failure).',
  },

  // Diabetes / High Sugar (15-22)
  {
    generic: 'Metformin Hydrochloride',
    strength: '500mg Tablet',
    category: 'Diabetes / High Sugar',
    use: 'Pangunahing gamot para sa Type 2 Diabetes; pinapababa ang paggawa ng sugar.',
  },
  {
    generic: 'Metformin Hydrochloride',
    strength: '850mg Tablet',
    category: 'Diabetes / High Sugar',
    use: 'Pangunahing gamot para sa Type 2 Diabetes; pinapababa ang paggawa ng sugar.',
  },
  {
    generic: 'Metformin Hydrochloride',
    strength: '1000mg Tablet',
    category: 'Diabetes / High Sugar',
    use: 'Pangunahing gamot para sa Type 2 Diabetes; pinapababa ang paggawa ng sugar.',
  },
  {
    generic: 'Gliclazide',
    strength: '30mg Modified Release Tablet',
    category: 'Diabetes / High Sugar',
    use: 'Pampasigla ng pancreas para gumawa ng mas maraming insulin.',
  },
  {
    generic: 'Gliclazide',
    strength: '60mg Modified Release Tablet',
    category: 'Diabetes / High Sugar',
    use: 'Pampasigla ng pancreas para gumawa ng mas maraming insulin.',
  },
  {
    generic: 'Gliclazide',
    strength: '80mg Tablet',
    category: 'Diabetes / High Sugar',
    use: 'Pampasigla ng pancreas para gumawa ng mas maraming insulin.',
  },
  {
    generic: 'Glibenclamide',
    strength: '5mg Tablet',
    category: 'Diabetes / High Sugar',
    use: 'Sulfonylurea na gamot sa diabetes upang kontrolin ang glucose sa dugo.',
  },

  // High Cholesterol (23-26)
  {
    generic: 'Simvastatin',
    strength: '20mg Tablet',
    category: 'High Cholesterol',
    use: 'Pinapababa ang bad cholesterol (LDL) at triglycerides sa dugo.',
  },
  {
    generic: 'Simvastatin',
    strength: '40mg Tablet',
    category: 'High Cholesterol',
    use: 'Pinapababa ang bad cholesterol (LDL) at triglycerides sa dugo.',
  },
  {
    generic: 'Atorvastatin Calcium',
    strength: '20mg Tablet',
    category: 'High Cholesterol',
    use: 'Mabisang statin para maiwasan ang atake sa puso at stroke sa pamamagitan ng pagbaba ng cholesterol.',
  },
  {
    generic: 'Atorvastatin Calcium',
    strength: '40mg Tablet',
    category: 'High Cholesterol',
    use: 'Mabisang statin para maiwasan ang atake sa puso at stroke sa pamamagitan ng pagbaba ng cholesterol.',
  },

  // Asthma, Cough & Pulmonary (27-36)
  {
    generic: 'Salbutamol Sulfate',
    strength: '100mcg Inhaler',
    category: 'Asthma & Cough',
    use: 'Mabilisang pampaluwag ng airways kapag may hika o sumisikip ang dibdib.',
  },
  {
    generic: 'Salbutamol Sulfate',
    strength: '2.5mg/2.5ml Nebule',
    category: 'Asthma & Cough',
    use: 'Solusyon para sa nebulizer upang mabilis na maibsan ang severe asthma attack.',
  },
  {
    generic: 'Salbutamol Sulfate',
    strength: '2mg Tablet',
    category: 'Asthma & Cough',
    use: 'Pangmatagalang suporta sa hika at pampaluwag ng bronchus.',
  },
  {
    generic: 'Salbutamol Sulfate',
    strength: '2mg/5ml Syrup',
    category: 'Asthma & Cough',
    use: 'Pampaluwag ng hika na angkop para sa mga bata.',
  },
  {
    generic: 'Fluticasone Propionate + Salmeterol',
    strength: '125mcg/25mcg Inhaler',
    category: 'Asthma & Cough',
    use: 'Pang-araw-araw na preventive inhaler para maiwasan ang pagsumpong ng hika.',
  },
  {
    generic: 'Fluticasone Propionate + Salmeterol',
    strength: '250mcg/25mcg Inhaler',
    category: 'Asthma & Cough',
    use: 'Pang-araw-araw na preventive inhaler para maiwasan ang pagsumpong ng hika.',
  },
  {
    generic: 'Prednisone',
    strength: '5mg Tablet',
    category: 'Asthma & Cough',
    use: 'Corticosteroid na pambawas ng pamamaga sa malalang hika at allergy.',
  },
  {
    generic: 'Prednisone',
    strength: '10mg Tablet',
    category: 'Asthma & Cough',
    use: 'Corticosteroid na pambawas ng pamamaga sa malalang hika at allergy.',
  },
  {
    generic: 'Prednisone',
    strength: '20mg Tablet',
    category: 'Asthma & Cough',
    use: 'Corticosteroid na pambawas ng pamamaga sa malalang hika at allergy.',
  },
  {
    generic: 'Carbocisteine',
    strength: '500mg Capsule',
    category: 'Asthma & Cough',
    use: 'Mucolytic na pampalabnaw ng makapal at madikit na plema para madaling mailabas.',
  },
  {
    generic: 'Carbocisteine',
    strength: '250mg/5ml Syrup',
    category: 'Asthma & Cough',
    use: 'Pampalabnaw ng plema na angkop para sa mga bata.',
  },
  {
    generic: 'Ambroxol Hydrochloride',
    strength: '30mg Tablet',
    category: 'Asthma & Cough',
    use: 'Pampalabnaw at pampalabas ng plema sa ubo.',
  },
  {
    generic: 'Ambroxol Hydrochloride',
    strength: '15mg/5ml Syrup',
    category: 'Asthma & Cough',
    use: 'Pampalabnaw ng ubo at plema para sa mga bata.',
  },

  // Antibiotics (37-48)
  {
    generic: 'Amoxicillin Trihydrate',
    strength: '250mg Capsule',
    category: 'Antibiotics',
    use: 'Lumalaban sa mga bacterial infection tulad ng sa lalamunan, tenga, at balat.',
  },
  {
    generic: 'Amoxicillin Trihydrate',
    strength: '500mg Capsule',
    category: 'Antibiotics',
    use: 'Lumalaban sa mga bacterial infection tulad ng sa lalamunan, tenga, at balat.',
  },
  {
    generic: 'Amoxicillin Trihydrate',
    strength: '125mg/5ml Suspension',
    category: 'Antibiotics',
    use: 'Bacterial antibiotic na likido para sa impeksyon ng mga bata.',
  },
  {
    generic: 'Co-Amoxiclav (Amoxicillin + Clavulanate)',
    strength: '625mg Tablet',
    category: 'Antibiotics',
    use: 'Mas pinalakas na antibiotic para sa mas matinding impeksyon sa baga, balat, o ihi.',
  },
  {
    generic: 'Co-Amoxiclav (Amoxicillin + Clavulanate)',
    strength: '312.5mg/5ml Suspension',
    category: 'Antibiotics',
    use: 'Pinalakas na antibiotic suspension para sa mga bata.',
  },
  {
    generic: 'Ciprofloxacin Hydrochloride',
    strength: '500mg Tablet',
    category: 'Antibiotics',
    use: 'Mabisang antibiotic para sa impeksyon sa ihi (UTI) at gastrointestinal infections.',
  },
  {
    generic: 'Clarithromycin',
    strength: '500mg Tablet',
    category: 'Antibiotics',
    use: 'Ginagamit sa respiratory tract infections at sa mga taong allergic sa penicillin.',
  },
  {
    generic: 'Nitrofurantoin',
    strength: '100mg Capsule',
    category: 'Antibiotics',
    use: 'Espesyal na antibiotic na nakatutok sa pagsugpo ng urinary tract infection (UTI).',
  },
  {
    generic: 'Cotrimoxazole (Sulfamethoxazole + Trimethoprim)',
    strength: '800mg/160mg Tablet',
    category: 'Antibiotics',
    use: 'Kumbinasyong antibiotic para sa respiratory, urinary, at bowel infections.',
  },
  {
    generic: 'Doxycycline Hyclate',
    strength: '100mg Capsule',
    category: 'Antibiotics',
    use: "Gamot sa iba't ibang bacterial infection kabilang ang leptospirosis at respiratory infections.",
  },
  {
    generic: 'Erythromycin',
    strength: '500mg Tablet',
    category: 'Antibiotics',
    use: 'Macrolide antibiotic para sa mga impeksyon sa balat, baga, at soft tissues.',
  },
  {
    generic: 'Azithromycin Dihydrate',
    strength: '500mg Tablet',
    category: 'Antibiotics',
    use: 'Mabilisang 3-araw o 5-araw na antibiotic para sa pulmonya, sinus, at lalamunan.',
  },

  // Fever & Pain (49-56)
  {
    generic: 'Paracetamol',
    strength: '500mg Tablet',
    category: 'Fever & Pain',
    use: 'Ligtas at karaniwang gamot para sa lagnat, sakit ng ulo, at iba pang pananakit.',
  },
  {
    generic: 'Paracetamol',
    strength: '125mg/5ml Syrup',
    category: 'Fever & Pain',
    use: 'Pababa ng lagnat at pawi ng sakit para sa sanggol at bata.',
  },
  {
    generic: 'Paracetamol',
    strength: '250mg/5ml Syrup',
    category: 'Fever & Pain',
    use: 'Pababa ng lagnat at pawi ng sakit para sa mga mas nakatatandang bata.',
  },
  {
    generic: 'Ibuprofen',
    strength: '200mg Tablet',
    category: 'Fever & Pain',
    use: 'Non-steroidal anti-inflammatory drug (NSAID) para sa sakit at pamamaga.',
  },
  {
    generic: 'Ibuprofen',
    strength: '400mg Tablet',
    category: 'Fever & Pain',
    use: 'NSAID para sa pananakit ng kasu-kasuan, ngipin, at dysmenorrhea.',
  },
  {
    generic: 'Ibuprofen',
    strength: '100mg/5ml Suspension',
    category: 'Fever & Pain',
    use: 'Pampababa ng lagnat at pamamaga para sa mga bata.',
  },
  {
    generic: 'Mefenamic Acid',
    strength: '250mg Capsule',
    category: 'Fever & Pain',
    use: 'Mabilisang pawi ng sakit sa ngipin, arthritis, at pananakit ng puson.',
  },
  {
    generic: 'Mefenamic Acid',
    strength: '500mg Capsule',
    category: 'Fever & Pain',
    use: 'Mabilisang pawi ng sakit sa ngipin, arthritis, at pananakit ng puson.',
  },

  // Allergies & Antihistamines (57-60)
  {
    generic: 'Cetirizine Hydrochloride',
    strength: '10mg Tablet',
    category: 'Allergies & Antihistamines',
    use: 'Non-drowsy na antihistamine para sa sipon, kati-kati, at allergic rhinitis.',
  },
  {
    generic: 'Cetirizine Hydrochloride',
    strength: '5mg/5ml Syrup',
    category: 'Allergies & Antihistamines',
    use: 'Gamot sa allergy na likido para sa mga bata.',
  },
  {
    generic: 'Chlorpheniramine Maleate',
    strength: '4mg Tablet',
    category: 'Allergies & Antihistamines',
    use: 'Klasikong antihistamine para sa mabilisang ginhawa sa pangangati at sipon (nakakaantok).',
  },
  {
    generic: 'Loratadine',
    strength: '10mg Tablet',
    category: 'Allergies & Antihistamines',
    use: 'Pang-24 oras na allergy relief na hindi nakakaantok.',
  },

  // Heart & Stroke Support (61-64)
  {
    generic: 'Aspirin (Low Dose)',
    strength: '80mg Tablet',
    category: 'Heart & Stroke Support',
    use: 'Pampalabnaw ng dugo upang maiwasan ang pamumuo ng dugo at atake sa puso o stroke.',
  },
  {
    generic: 'Aspirin',
    strength: '100mg Enteric Coated Tablet',
    category: 'Heart & Stroke Support',
    use: 'Proteksyon laban sa stroke at atake sa puso na may coating para sa sikmura.',
  },
  {
    generic: 'Clopidogrel Bisulfate',
    strength: '75mg Tablet',
    category: 'Heart & Stroke Support',
    use: 'Antiplatelet na nagpapanatiling maayos ang daloy ng dugo pagkatapos ma-stroke o ma-angioplasty.',
  },
  {
    generic: 'Isosorbide Mononitrate',
    strength: '30mg Modified Release Tablet',
    category: 'Heart & Stroke Support',
    use: 'Preventive na gamot laban sa pananakit ng dibdib (angina).',
  },

  // Dehydration (65)
  {
    generic: 'Oral Rehydration Salts (ORS)',
    strength: '20.5g Sachet',
    category: 'Dehydration',
    use: 'Pampalit ng nawalang tubig at electrolytes kapag nagtatae o nagsusuka.',
  },

  // Gastrointestinal / Tiyan (66-72)
  {
    generic: 'Omeprazole',
    strength: '20mg Capsule',
    category: 'Gastrointestinal / Tiyan',
    use: 'Proton pump inhibitor na nagpapababa ng asido sa sikmura para sa hyperacidity at ulcer.',
  },
  {
    generic: 'Omeprazole',
    strength: '40mg Capsule',
    category: 'Gastrointestinal / Tiyan',
    use: 'Proton pump inhibitor na nagpapababa ng asido sa sikmura para sa hyperacidity at ulcer.',
  },
  {
    generic: 'Famotidine',
    strength: '20mg Tablet',
    category: 'Gastrointestinal / Tiyan',
    use: 'H2-blocker na nagbabawas ng acid sa sikmura at lunas sa heartburn.',
  },
  {
    generic: 'Dicycloverine Hydrochloride',
    strength: '10mg Tablet',
    category: 'Gastrointestinal / Tiyan',
    use: 'Antispasmodic para pawiin ang pananakit at paghilab ng tiyan.',
  },
  {
    generic: 'Dicycloverine Hydrochloride',
    strength: '5mg/5ml Syrup',
    category: 'Gastrointestinal / Tiyan',
    use: 'Pampawi ng paghilab ng tiyan na angkop sa bata.',
  },
  {
    generic: 'Domperidone',
    strength: '10mg Tablet',
    category: 'Gastrointestinal / Tiyan',
    use: 'Gamot laban sa pagduduwal, pagsusuka, at kabag.',
  },
  {
    generic: 'Metoclopramide Hydrochloride',
    strength: '10mg Tablet',
    category: 'Gastrointestinal / Tiyan',
    use: 'Pampabilis ng pagtunaw ng pagkain para maibsan ang pagduduwal at pagsusuka.',
  },

  // Vitamins, Minerals & Hormones (73-77)
  {
    generic: 'Multivitamins (Adult)',
    strength: 'Capsule',
    category: 'Vitamins & Minerals',
    use: 'Pang-araw-araw na bitamina upang palakasin ang resistensya laban sa sakit.',
  },
  {
    generic: 'Ferrous Sulfate + Folic Acid',
    strength: 'Tablet',
    category: 'Vitamins & Minerals',
    use: 'Suplemento sa dugo para iwasan o gamutin ang anemia, lalo na sa mga buntis.',
  },
  {
    generic: 'Calcium Carbonate',
    strength: '500mg Tablet',
    category: 'Vitamins & Minerals',
    use: 'Suplemento para sa malusog na buto at ngipin.',
  },
  {
    generic: 'Zinc Sulfate',
    strength: '55mg/5ml Syrup',
    category: 'Vitamins & Minerals',
    use: 'Mahalagang mineral para sa paggaling ng bata mula sa diarrhea at pampalakas ng resistensya.',
  },
  {
    generic: 'Levothyroxine Sodium',
    strength: '50mcg Tablet',
    category: 'Thyroid Support',
    use: 'Hormone replacement para sa mga may hypothyroid o kulang ang thyroid hormone.',
  },
  {
    generic: 'Levothyroxine Sodium',
    strength: '100mcg Tablet',
    category: 'Thyroid Support',
    use: 'Hormone replacement para sa mga may hypothyroid o kulang ang thyroid hormone.',
  },
];

const MEDICINE_CATEGORIES = [
  'All',
  'Hypertension / High Blood',
  'Diabetes / High Sugar',
  'High Cholesterol',
  'Asthma & Cough',
  'Antibiotics',
  'Fever & Pain',
  'Allergies & Antihistamines',
  'Heart & Stroke Support',
  'Gastrointestinal / Tiyan',
  'Vitamins & Minerals',
  'Thyroid Support',
  'Dehydration',
];

// Helper to translate categories
const getCategoryName = (category: string, isFil: boolean) => {
  if (isFil) {
    switch (category) {
      case 'Hypertension / High Blood':
        return 'Altapresyon / Mataas na Presyon';
      case 'Diabetes / High Sugar':
        return 'Diabetes / Mataas na Sugar';
      case 'High Cholesterol':
        return 'Mataas na Cholesterol';
      case 'Asthma & Cough':
        return 'Hika at Ubo';
      case 'Antibiotics':
        return 'Antibiotic';
      case 'Fever & Pain':
        return 'Lagnat at Sakit';
      case 'Allergies & Antihistamines':
        return 'Allergy at Ginhawa';
      case 'Heart & Stroke Support':
        return 'Suporta sa Puso at Stroke';
      case 'Gastrointestinal / Tiyan':
        return 'Sakit sa Tiyan / Sikmura';
      case 'Vitamins & Minerals':
        return 'Bitamina at Mineral';
      case 'Thyroid Support':
        return 'Suporta sa Thyroid';
      case 'Dehydration':
        return 'Dehydration / Pagtatae';
      default:
        return category;
    }
  }
  switch (category) {
    case 'Hypertension / High Blood':
      return 'Hypertension / High Blood';
    case 'Diabetes / High Sugar':
      return 'Diabetes / High Sugar';
    case 'High Cholesterol':
      return 'High Cholesterol';
    case 'Asthma & Cough':
      return 'Asthma & Cough';
    case 'Antibiotics':
      return 'Antibiotics';
    case 'Fever & Pain':
      return 'Fever & Pain';
    case 'Allergies & Antihistamines':
      return 'Allergies & Antihistamines';
    case 'Heart & Stroke Support':
      return 'Heart & Stroke Support';
    case 'Gastrointestinal / Tiyan':
      return 'Gastrointestinal / Stomach';
    case 'Vitamins & Minerals':
      return 'Vitamins & Minerals';
    case 'Thyroid Support':
      return 'Thyroid Support';
    case 'Dehydration':
      return 'Dehydration';
    default:
      return category;
  }
};

// Helper to translate uses
const translateMedUse = (use: string, isFil: boolean) => {
  if (isFil) return use;

  const translations: Record<string, string> = {
    'Pababa ng altapresyon at pampaluwag ng ugat sa puso.':
      'Lowers blood pressure and relaxes blood vessels in the heart.',
    'Pinipigilan ang pag-igting ng mga ugat para bumaba ang presyon.':
      'Prevents blood vessel constriction to lower pressure.',
    'Pampabagal ng mabilis na tibok ng puso at pampababa ng presyon.':
      'Slows rapid heart rate and reduces blood pressure.',
    'ACE Inhibitor na pampababa ng presyon at proteksyon sa puso.':
      'ACE Inhibitor to lower blood pressure and protect the heart.',
    'Diuretic o pampaihi para bawasan ang labis na likido sa katawan.':
      'Diuretic to reduce excess fluid and sodium in the body.',
    'Mabilisang pampababa ng presyon sa oras ng hypertensive crisis.':
      'Rapidly lowers blood pressure during hypertensive crises.',
    'Beta-blocker para sa high blood at mahinang puso (heart failure).':
      'Beta-blocker for high blood pressure and heart failure.',
    'Pangunahing gamot para sa Type 2 Diabetes; pinapababa ang paggawa ng sugar.':
      'First-line drug for Type 2 Diabetes; reduces liver glucose production.',
    'Pampasigla ng pancreas para gumawa ng mas maraming insulin.':
      'Stimulates the pancreas to produce more natural insulin.',
    'Sulfonylurea na gamot sa diabetes upang kontrolin ang glucose sa dugo.':
      'Sulfonylurea diabetes drug to help control blood glucose.',
    'Pinapababa ang bad cholesterol (LDL) at triglycerides sa dugo.':
      'Lowers bad cholesterol (LDL) and triglycerides in the blood.',
    'Mabisang statin para maiwasan ang atake sa puso at stroke sa pamamagitan ng pagbaba ng cholesterol.':
      'Effective statin to prevent heart attack and stroke by lowering cholesterol.',
    'Mabilisang pampaluwag ng airways kapag may hika o sumisikip ang dibdib.':
      'Fast-acting bronchodilator for asthma relief and chest tightness.',
    'Solusyon para sa nebulizer upang mabilis na maibsan ang severe asthma attack.':
      'Nebulizer solution to rapidly relieve severe asthma attacks.',
    'Pangmatagalang suporta sa hika at pampaluwag ng bronchus.':
      'Long-term asthma support and bronchus muscle relaxation.',
    'Pampaluwag ng hika na angkop para sa mga bata.':
      'Asthma reliever syrup suitable for pediatric patients.',
    'Pang-araw-araw na preventive inhaler para maiwasan ang pagsumpong ng hika.':
      'Daily preventive inhaler to control and prevent asthma flare-ups.',
    'Corticosteroid na pambawas ng pamamaga sa malalang hika at allergy.':
      'Corticosteroid to reduce severe inflammation from asthma and allergies.',
    'Mucolytic na pampalabnaw ng makapal at madikit na plema para madaling mailabas.':
      'Mucolytic that thins thick, sticky mucus for easier coughing out.',
    'Pampalabnaw ng plema na angkop para sa mga bata.':
      'Mucolytic syrup suitable to thin phlegm in children.',
    'Pampalabnaw at pampalabas ng plema sa ubo.':
      'Thins and aids in the excretion of thick phlegm from coughs.',
    'Pampalabnaw ng ubo at plema para sa mga bata.':
      'Thins cough secretions and phlegm for pediatric patients.',
    'Lumalaban sa mga bacterial infection tulad ng sa lalamunan, tenga, at balat.':
      'Combats bacterial infections of the throat, ears, and skin.',
    'Bacterial antibiotic na likido para sa impeksyon ng mga bata.':
      'Liquid bacterial antibiotic suitable for pediatric infections.',
    'Mas pinalakas na antibiotic para sa mas matinding impeksyon sa baga, balat, o ihi.':
      'Enhanced antibiotic for severe lung, skin, or urinary tract infections.',
    'Pinalakas na antibiotic suspension para sa mga bata.':
      'Enhanced pediatric antibiotic suspension for childhood infections.',
    'Mabisang antibiotic para sa impeksyon sa ihi (UTI) at gastrointestinal infections.':
      'Effective antibiotic for urinary tract infections (UTIs) and gut infections.',
    'Ginagamit sa respiratory tract infections at sa mga taong allergic sa penicillin.':
      'Used for respiratory tract infections and as an alternative for penicillin allergies.',
    'Espesyal na antibiotic na nakatutok sa pagsugpo ng urinary tract infection (UTI).':
      'Targeted antibiotic specifically focused on treating urinary tract infections (UTIs).',
    'Kumbinasyong antibiotic para sa respiratory, urinary, at bowel infections.':
      'Combination antibiotic for respiratory, urinary, and intestinal infections.',
    "Gamot sa iba't ibang bacterial infection kabilang ang leptospirosis at respiratory infections.":
      'Treats various bacterial infections, including leptospirosis and chest infections.',
    'Macrolide antibiotic para sa mga impeksyon sa balat, baga, at soft tissues.':
      'Macrolide antibiotic for skin, lung, and soft tissue infections.',
    'Mabilisang 3-araw o 5-araw na antibiotic para sa pulmonya, sinus, at lalamunan.':
      'Short 3-day or 5-day antibiotic course for pneumonia, sinus, and throat infections.',
    'Ligtas at karaniwang gamot para sa lagnat, sakit ng ulo, at iba pang pananakit.':
      'Safe, common drug to reduce fever, headache, and other body aches.',
    'Pababa ng lagnat at pawi ng sakit para sa sanggol at bata.':
      'Reduces fever and relieves pain in infants and young children.',
    'Pababa ng lagnat at pawi ng sakit para sa mga mas nakatatandang bata.':
      'Reduces fever and relieves pain in older pediatric patients.',
    'Non-steroidal anti-inflammatory drug (NSAID) para sa sakit at pamamaga.':
      'Non-steroidal anti-inflammatory drug (NSAID) for pain and swelling.',
    'NSAID para sa pananakit ng kasu-kasuan, ngipin, at dysmenorrhea.':
      'NSAID for joint pain, toothache, and menstrual cramps (dysmenorrhea).',
    'Pampababa ng lagnat at pamamaga para sa mga bata.':
      'Reduces fever and inflammation for pediatric patients.',
    'Mabilisang pawi ng sakit sa ngipin, arthritis, at pananakit ng puson.':
      'Rapid relief for toothaches, arthritis, and menstrual pain.',
    'Non-drowsy na antihistamine para sa sipon, kati-kati, at allergic rhinitis.':
      'Non-drowsy antihistamine for cold symptoms, hives, and allergic rhinitis.',
    'Gamot sa allergy na likido para sa mga bata.':
      'Liquid allergy and antihistamine medication for children.',
    'Klasikong antihistamine para sa mabilisang ginhawa sa pangangati at sipon (nakakaantok).':
      'Classic antihistamine for fast relief from itching and runny nose (causes drowsiness).',
    'Pang-24 oras na allergy relief na hindi nakakaantok.':
      '24-hour non-drowsy allergy and hives relief.',
    'Pampalabnaw ng dugo upang maiwasan ang pamumuo ng dugo at atake sa puso o stroke.':
      'Blood thinner to prevent clot formation, heart attacks, or strokes.',
    'Proteksyon laban sa stroke at atake sa puso na may coating para sa sikmura.':
      'Stroke and heart attack protection with a stomach-friendly enteric coating.',
    'Antiplatelet na nagpapanatiling maayos ang daloy ng dugo pagkatapos ma-stroke o ma-angioplasty.':
      'Antiplatelet that keeps blood flowing smoothly after a stroke or angioplasty.',
    'Preventive na gamot laban sa pananakit ng dibdib (angina).':
      'Preventive medication to avoid chest pain (angina pectoris).',
    'Pampalit ng nawalang tubig at electrolytes kapag nagtatae o nagsusuka.':
      'Replaces lost water and essential electrolytes during diarrhea or vomiting.',
    'Proton pump inhibitor na nagpapababa ng asido sa sikmura para sa hyperacidity at ulcer.':
      'Proton pump inhibitor that reduces stomach acid for hyperacidity and ulcers.',
    'H2-blocker na nagbabawas ng acid sa sikmura at lunas sa heartburn.':
      'H2-blocker that reduces stomach acid secretion and treats heartburn.',
    'Antispasmodic para pawiin ang pananakit at paghilab ng tiyan.':
      'Antispasmodic to relieve stomach cramps and abdominal pain.',
    'Pampawi ng paghilab ng tiyan na angkop sa bata.':
      'Abdominal cramp reliever suitable for pediatric patients.',
    'Gamot laban sa pagduduwal, pagsusuka, at kabag.':
      'Medication to treat nausea, vomiting, and abdominal bloating.',
    'Pampabilis ng pagtunaw ng pagkain para maibsan ang pagduduwal at pagsusuka.':
      'Speeds up digestion to prevent nausea and vomiting.',
    'Pang-araw-araw na bitamina upang palakasin ang resistensya laban sa sakit.':
      'Daily multivitamins to boost immune defense against illnesses.',
    'Suplemento sa dugo para iwasan o gamutin ang anemia, lalo na sa mga buntis.':
      'Iron and folic acid blood supplement to prevent or treat anemia, especially during pregnancy.',
    'Suplemento para sa malusog na buto at ngipin.':
      'Calcium supplement to support healthy bone density and strong teeth.',
    'Mahalagang mineral para sa paggaling ng bata mula sa diarrhea at pampalakas ng resistensya.':
      'Essential mineral to help children recover from diarrhea and build immunity.',
    'Hormone replacement para sa mga may hypothyroid o kulang ang thyroid hormone.':
      'Hormone replacement for patients with hypothyroidism (underactive thyroid).',
  };

  // Address some specialized variations
  if (
    use === 'H2-blocker na nagbabawas ng acid sa sikmura at lunas sa heartburn.'
  )
    return 'H2-blocker that reduces stomach acid secretion and treats heartburn.';
  if (use === 'Antispasmodic para pawiin ang pananakit at paghilab ng tiyan.')
    return 'Antispasmodic to relieve stomach cramps and abdominal pain.';
  if (use === 'Pampawi ng paghilab ng tiyan na angkop sa bata.')
    return 'Abdominal cramp reliever suitable for pediatric patients.';
  if (use === 'Gamot laban sa pagduduwal, pagsusuka, at kabag.')
    return 'Medication to treat nausea, vomiting, and abdominal bloating.';
  if (
    use ===
    'Pampabilis ng pagtunaw ng pagkain para maibsan ang pagduduwal at pagsusuka.'
  )
    return 'Speeds up digestion to prevent nausea and vomiting.';
  if (
    use ===
    'Pang-araw-araw na bitamina upang palakasin ang resistensya laban sa sakit.'
  )
    return 'Daily multivitamins to boost immune defense against illnesses.';
  if (
    use ===
    'Suplemento sa dugo para iwasan o gamutin ang anemia, lalo na sa mga buntis.'
  )
    return 'Iron and folic acid blood supplement to prevent or treat anemia, especially during pregnancy.';
  if (use === 'Suplemento para sa malusog na buto at ngipin.')
    return 'Calcium supplement to support healthy bone density and strong teeth.';
  if (
    use ===
    'Mahalagang mineral para sa paggaling ng bata mula sa diarrhea at pampalakas ng resistensya.'
  )
    return 'Essential mineral to help children recover from diarrhea and build immunity.';
  if (
    use ===
    'Hormone replacement para sa mga may hypothyroid o kulang ang thyroid hormone.'
  )
    return 'Hormone replacement for patients with hypothyroidism (underactive thyroid).';

  return translations[use] || use;
};

export default function YakapInteractive() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';

  const [activeTab, setActiveTab] = useState<'checkups' | 'labs' | 'gamot'>(
    'checkups'
  );
  const [medSearch, setMedSearch] = useState('');
  const [selectedMedCategory, setSelectedMedCategory] = useState('All');
  const [enrollmentPath, setEnrollmentPath] = useState<'online' | 'inperson'>(
    'online'
  );
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Checklist for wizard
  const [onlineChecklist, setOnlineChecklist] = useState({
    step1: false,
    step2: false,
    step3: false,
  });

  const [inPersonChecklist, setInPersonChecklist] = useState({
    step1: false,
    step2: false,
    step3: false,
  });

  // Dynamic translated lab tests
  const translatedLabTests = useMemo(() => {
    return LAB_TESTS.map(test => {
      if (isFil) {
        return {
          id: test.id,
          name: test.name,
          layDescription: test.layDescription,
          details:
            test.id === 'cbc'
              ? 'Tumutulong na makita ang impeksyon, anemia, mga karamdaman sa pagdurugo, at binabantayan ang platelet count para sa mga sakit tulad ng dengue.'
              : test.id === 'urinalysis'
                ? 'Sinisiyasat ang impeksyon sa ihi (UTI), dysfunction sa bato, at mga maagang metabolic disorder.'
                : test.id === 'fecalysis'
                  ? 'Nakakakita ng mga impeksyon sa digestive tract, mga bulate, amoebiasis, at iba pang problema sa tiyan.'
                  : test.id === 'fbs'
                    ? 'Sinusukat ang antas ng glucose pagkatapos ng 8 oras na ayuno para sa pag-detect ng diabetes.'
                    : test.id === 'ogtt'
                      ? 'Sinusuri kung paano pinoproseso ng katawan ang asukal sa paglipas ng oras. Mahalaga para sa mga buntis.'
                      : test.id === 'hba1c'
                        ? 'Nagbibigay ng 3-buwang average ng asukal sa dugo para sa pagsubaybay sa diabetes.'
                        : test.id === 'lipid'
                          ? 'Sinusukat ang kabuuang cholesterol, HDL, LDL, at triglycerides para sa puso.'
                          : test.id === 'creatinine'
                            ? 'Sinusukat ang creatinine sa dugo para masuri ang function ng kidney.'
                            : test.id === 'ecg'
                              ? 'Nirerekord ang electrical signals ng puso para sa irregular rhythms o sakit sa puso.'
                              : test.id === 'xray'
                                ? 'Sinisiyasat ang mga impeksyon sa baga, TB, pneumonia, o paglaki ng puso.'
                                : test.id === 'sputum'
                                  ? 'Tiyak na pagsusuri ng plema para sa diagnosis at kumpirmasyon ng TB.'
                                  : test.id === 'pap'
                                    ? 'Pagsusuri sa cervix para sa maagang pag-iwas sa cervical cancer sa mga kababaihan.'
                                    : 'Sinisiyasat ang nakatagong dugo sa dumi para sa screening ng colon cancer at internal bleeding.',
        };
      } else {
        return {
          id: test.id,
          name: test.name,
          layDescription:
            test.id === 'cbc'
              ? 'Blood test to screen for infections, anemia, or dengue.'
              : test.id === 'urinalysis'
                ? 'Urine check to screen for UTIs or kidney disease.'
                : test.id === 'fecalysis'
                  ? 'Stool check for parasites or stomach infections.'
                  : test.id === 'fbs'
                    ? 'Blood sugar screening to diagnose or monitor diabetes.'
                    : test.id === 'ogtt'
                      ? 'Advanced blood sugar test, especially for pregnant women.'
                      : test.id === 'hba1c'
                        ? 'Average blood sugar level over the past 3 months.'
                        : test.id === 'lipid'
                          ? 'Cholesterol and triglycerides check for heart disease risk.'
                          : test.id === 'creatinine'
                            ? 'Kidney health and function assessment.'
                            : test.id === 'ecg'
                              ? 'Heart rhythm and electrical activity check.'
                              : test.id === 'xray'
                                ? 'Lung scan for pneumonia, infections, or tuberculosis.'
                                : test.id === 'sputum'
                                  ? 'Phlegm check to confirm tuberculosis (TB) diagnosis.'
                                  : test.id === 'pap'
                                    ? 'Cervical screening to prevent and detect cervical cancer.'
                                    : 'Stool test for hidden blood to screen for colon cancer.',
          details: test.details,
        };
      }
    });
  }, [isFil]);

  // Dynamic translated medicines database
  const translatedMedicines = useMemo(() => {
    return MEDICINE_DATABASE.map(med => ({
      ...med,
      category: getCategoryName(med.category, isFil),
      use: translateMedUse(med.use, isFil),
    }));
  }, [isFil]);

  // Medicine Finder Filtering
  const filteredMedicines = useMemo(() => {
    return translatedMedicines.filter(med => {
      const matchesSearch =
        med.generic.toLowerCase().includes(medSearch.toLowerCase()) ||
        med.use.toLowerCase().includes(medSearch.toLowerCase()) ||
        med.strength.toLowerCase().includes(medSearch.toLowerCase());

      const matchesCategory =
        selectedMedCategory === 'All' ||
        med.category === getCategoryName(selectedMedCategory, isFil);

      return matchesSearch && matchesCategory;
    });
  }, [translatedMedicines, medSearch, selectedMedCategory, isFil]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleOnlineToggle = (step: 'step1' | 'step2' | 'step3') => {
    setOnlineChecklist(prev => ({ ...prev, [step]: !prev[step] }));
  };

  const handleInPersonToggle = (step: 'step1' | 'step2' | 'step3') => {
    setInPersonChecklist(prev => ({ ...prev, [step]: !prev[step] }));
  };

  const onlineCompletedCount =
    Object.values(onlineChecklist).filter(Boolean).length;
  const inPersonCompletedCount =
    Object.values(inPersonChecklist).filter(Boolean).length;

  const breadcrumbsItems = useMemo(
    () => [
      { label: isFil ? 'Tahanan' : 'Home', href: '/' },
      { label: isFil ? 'Mga Serbisyo' : 'Services', href: '/services' },
      {
        label: isFil ? 'Serbisyong Pangkalusugan' : 'Health Services',
        href: '/services/health-services',
      },
      {
        label: 'PhilHealth YAKAP Hub',
        href: '/services/health-services/access-free-check-ups-labs-and-medicines-through-philhealth-yakap',
      },
    ],
    [isFil]
  );

  const FAQs = useMemo(() => {
    return isFil
      ? [
          {
            q: 'Libre po ba talaga ito? May babayaran ba kami sa RHU?',
            a: 'Opo, 100% LIBRE. Ang PhilHealth YAKAP ay tumatakbo sa ilalim ng zero out-of-pocket policy. Ibig sabihin, wala kayong bababayarang kahit ano para sa mga check-up, nakalistang laboratory tests, at mga gamot sa ilalim ng GAMOT package basta gawin ito sa Indang Rural Health Unit (RHU) o accredited government facility.',
          },
          {
            q: 'Maaari ko bang irehistro ang buong pamilya ko sa aking PhilHealth?',
            a: "Opo! Hangga't sila ay idineklara bilang dependents sa inyong PhilHealth Member Data Record (MDR). Ang inyong asawa, mga anak na wala pang 21 taong gulang, at mga magulang na 60 taong gulang pataas na hindi pa miyembro ay kwalipikadong dependents. Bawat dependent ay may sarili ring hiwalay na benepisyo tulad ng check-up at sariling ₱20,000 allowance sa gamot.",
          },
          {
            q: 'Paano kung ang niresetang gamot ng doktor ay wala sa listahan ng YAKAP?',
            a: 'Tanging ang higit 75 na generic formulations na aprubado sa ilalim ng PhilHealth GAMOT package ang sakop at ibinibigay ng libre. Kung ang niresetang gamot ay wala sa listahan, kailangan niyo po itong bilhin sa sariling gastos. Maaari ninyong tanungin ang inyong YAKAP doctor kung may alternatibong gamot na kasama sa libreng listahan.',
          },
          {
            q: 'Maaari ko bang palitan ang aking designated YAKAP clinic sa susunod?',
            a: 'Opo, maaari kayong magpalit ng inyong designated clinic o primary care provider isang beses sa isang taon, o kung kayo ay lumipat ng tirahan. Magagawa ito sa pamamagitan ng eGovPH app, PhilHealth Member Portal, o sa pagbisita sa Municipal Health Office.',
          },
          {
            q: 'Paano kapag naubos ang ₱20,000 na allowance sa gamot para sa taon?',
            a: 'Ang ₱20,000 na allowance ay higit pa sa sapat para sa taunang maintenance ng high blood, cholesterol, at diabetes ng isang regular na pasyente. Kung ito ay maubos, ang mga check-up at laboratory tests ay mananatiling libre at walang babayaran sa RHU. Ang mga karagdagang gamot pagkatapos maubos ang allowance ay kailangang bilhin ng pasyente sa sariling gastos hanggang sa mag-renew ang allowance sa susunod na kalendaryong taon.',
          },
        ]
      : [
          {
            q: 'Is this program really free? Do we need to pay anything at the RHU?',
            a: 'Yes, it is 100% FREE. The PhilHealth YAKAP program operates under a strict zero out-of-pocket policy. This means you do not need to pay anything for consultations, designated lab tests, or medicines covered by the GAMOT package, as long as you avail of them at the Indang Rural Health Unit (RHU) or accredited government facilities.',
          },
          {
            q: 'Can I register my entire family under my PhilHealth account?',
            a: 'Yes! As long as they are declared as qualified dependents on your PhilHealth Member Data Record (MDR). This includes your non-member spouse, unmarried/unemployed children under 21 years old, and parents aged 60 and above who are not members. Each dependent receives their own separate YAKAP benefits (consultations, check-ups, and a separate annual ₱20,000 medicine allowance).',
          },
          {
            q: 'What if the medicine prescribed by my doctor is not on the YAKAP list?',
            a: 'Only the 75+ generic formulations approved under the PhilHealth GAMOT package are fully covered and provided for free. If you require a non-covered medication, you will need to purchase it at your own expense. You may ask your YAKAP doctor if there is an alternative covered medication on the list.',
          },
          {
            q: 'Can I change my designated YAKAP clinic later?',
            a: 'Yes, you can change your designated primary care clinic or provider once a year, or if you relocate. This can be updated online through the eGovPH app, the secure PhilHealth Member Portal, or by visiting the Indang Municipal Health Office in person.',
          },
          {
            q: 'What happens if I exhaust the ₱20,000 annual medicine allowance?',
            a: 'The ₱20,000 allowance is more than sufficient to cover a full year of maintenance medications for chronic conditions like high blood pressure, high cholesterol, and diabetes for a typical patient. If you exceed this limit, your medical consultations and diagnostic laboratory tests remain completely free of charge. Additional prescriptions beyond the limit must be purchased at your own expense until the allowance resets in the next calendar year.',
          },
        ];
  }, [isFil]);

  return (
    <>
      <SEO
        title={
          isFil
            ? 'Access Free Check-ups, Labs, and Medicines through PhilHealth YAKAP — Municipality of Indang'
            : 'Access Free Check-ups, Labs, and Medicines through PhilHealth YAKAP — Municipality of Indang'
        }
        description={
          isFil
            ? 'Opisyal na interactive hub ng PhilHealth YAKAP (Yaman ng Kalusugan Program) sa Indang, Cavite. Alamin ang tungkol sa libreng check-up, 13 laboratory tests, 75+ libreng outpatient na gamot, at paano magparehistro.'
            : 'Official interactive hub of the PhilHealth YAKAP (Yaman ng Kalusugan Program) in Indang, Cavite. Learn about free check-ups, 13 laboratory tests, 75+ free outpatient medicines, and how to enroll step-by-step.'
        }
        keywords="YAKAP, PhilHealth YAKAP, Indang RHU, Konsulta, libreng gamot, libreng checkup, Indang Cavite, Municipal Health Office"
      />
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-6 transition-colors duration-200">
        <Section className="max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            className="mb-6 text-gray-600 dark:text-gray-400"
            items={breadcrumbsItems}
          />

          {/* Premium Hero Banner with Official PhilHealth Image */}
          <div
            className="relative overflow-hidden rounded-3xl mb-10 shadow-xl border border-blue-200/50 dark:border-blue-900/40 text-white p-8 md:p-12 bg-cover bg-center"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(0, 48, 135, 0.95) 40%, rgba(0, 48, 135, 0.45) 100%), url("https://www.philhealth.gov.ph/yakap/images/YAKAPSubpage_WebsiteHero_v002.jpg")',
            }}
          >
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 border border-white/10 text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
                <ShieldCheck className="h-4 w-4" />{' '}
                {isFil
                  ? 'Lubos na Akreditadong Programang Pampubliko'
                  : 'Fully Accredited Municipal Program'}
              </div>
              <Heading
                level={1}
                className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-white"
              >
                PhilHealth YAKAP
              </Heading>
              <p className="text-base sm:text-lg text-blue-100 mb-8 leading-relaxed font-medium">
                {isFil ? (
                  <>
                    Yaman ng Kalusugan Program — Isang upgraded na programang
                    pangkalusugan na nagbibigay ng{' '}
                    <strong className="text-emerald-300 font-extrabold underline decoration-emerald-400 underline-offset-4">
                      libreng check-up, 13 laboratory tests, at hanggang ₱20,000
                      halaga ng libreng gamot kada taon
                    </strong>{' '}
                    para sa bawat mamamayan ng Indang.
                  </>
                ) : (
                  <>
                    Wealth of Health Program — An upgraded healthcare initiative
                    providing{' '}
                    <strong className="text-emerald-300 font-extrabold underline decoration-emerald-400 underline-offset-4">
                      free medical check-ups, 13 diagnostic laboratory tests,
                      and up to ₱20,000 worth of free medicines per year
                    </strong>{' '}
                    for every citizen of Indang.
                  </>
                )}
              </p>

              {/* Callout Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl text-emerald-300 shrink-0">
                    <Activity className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 uppercase font-bold tracking-wider">
                      {isFil ? 'Libreng Gamot' : 'Outpatient Medicine'}
                    </p>
                    <p className="text-2xl font-black text-white">
                      {isFil ? '₱20,000 / taon' : '₱20,000 / year'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl text-emerald-300 shrink-0">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 uppercase font-bold tracking-wider">
                      {isFil ? 'Pagsusuri sa Lab' : 'Diagnostic Tests'}
                    </p>
                    <p className="text-2xl font-black text-white">
                      {isFil ? '13 Libreng Labs' : '13 Free Labs'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl text-emerald-300 shrink-0">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 uppercase font-bold tracking-wider">
                      {isFil ? 'Gastos sa Bulsa' : 'Out-of-Pocket Cost'}
                    </p>
                    <p className="text-2xl font-black text-white">
                      {isFil ? '₱0 / Walang Bayad' : '₱0 / Zero Copay'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Inline Hero Disclaimer */}
              <div className="mt-6 flex items-start gap-2.5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 leading-relaxed">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-amber-400" />
                <p>
                  {isFil
                    ? 'Paunawa: Ang portal na ito ay gabay lamang para sa pagpaparehistro at pagtukoy ng mga benepisyo ng PhilHealth YAKAP sa Indang. Ang lahat ng reseta at medikal na diagnosis ay dapat magmula sa isang lisensyadong doktor sa Indang Rural Health Unit (RHU).'
                    : 'Important Notice: This portal serves as an informational tool for PhilHealth YAKAP enrollment in Indang. All clinical diagnoses and prescriptions must be officially issued by licensed medical officers at the Indang Rural Health Unit (RHU).'}
                </p>
              </div>
            </div>

            {/* Official Citation Badge */}
            <div className="absolute bottom-4 right-4 z-10 text-[10px] text-white/70 bg-black/55 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10">
              {isFil
                ? 'Opisyal na larawan mula sa'
                : 'Official image sourced from'}{' '}
              <a
                href="https://www.philhealth.gov.ph/yakap/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors font-semibold"
              >
                PhilHealth YAKAP Portal
              </a>
            </div>
          </div>

          {/* Main Dashboard Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content Area: Benefits Explorer & Medicine Finder */}
            <div className="lg:col-span-2 space-y-10">
              {/* Module 1: Interactive Benefits Explorer */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700/60">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div>
                    <Heading
                      level={2}
                      className="text-xl sm:text-2xl font-bold mb-0 text-gray-900 dark:text-white"
                    >
                      {isFil
                        ? 'Interactive na Gabay sa mga Benepisyo'
                        : 'Interactive Benefits Explorer'}
                    </Heading>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {isFil
                        ? 'Piliin ang tab para alamin ang detalye ng mga libreng benepisyo.'
                        : 'Select a tab below to explore the details of your free benefits.'}
                    </p>
                  </div>
                </div>

                {/* Explorer Tabs */}
                <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                  <button
                    onClick={() => setActiveTab('checkups')}
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                      activeTab === 'checkups'
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {isFil ? '🩺 Libreng Konsulta' : '🩺 Medical Consults'}
                  </button>
                  <button
                    onClick={() => setActiveTab('labs')}
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                      activeTab === 'labs'
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {isFil
                      ? '🧪 13 Laboratory Tests'
                      : '🧪 13 Laboratory Tests'}
                  </button>
                  <button
                    onClick={() => setActiveTab('gamot')}
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                      activeTab === 'gamot'
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {isFil
                      ? '💊 ₱20k Gamot Package'
                      : '💊 ₱20k Medicine Package'}
                  </button>
                </div>

                {/* Tab content area */}
                <div className="min-h-[250px] transition-all duration-300">
                  {activeTab === 'checkups' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 text-blue-900 dark:text-blue-200">
                        <h4 className="font-extrabold text-base mb-2">
                          {isFil
                            ? 'Libreng Konsulta at Medical Check-ups'
                            : 'Free Consultations and Medical Check-ups'}
                        </h4>
                        <p className="text-sm leading-relaxed">
                          {isFil
                            ? 'Sa ilalim ng PhilHealth YAKAP, mayroon kayong regular na access sa mga accredited na pamilyang doktor at mga primary care physicians sa Indang RHU nang walang binabayarang anumang fee o consultation charge.'
                            : 'Under the PhilHealth YAKAP program, you have regular, unlimited access to accredited family physicians and primary care doctors at the Indang RHU without paying any consultation fees.'}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                          <CardContent className="p-5">
                            <h5 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                              <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                              {isFil
                                ? 'Taunang Physical Examination'
                                : 'Annual Physical Examination'}
                            </h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                              {isFil
                                ? 'Suriin ang inyong pangkalahatang kalusugan, kumuha ng digital health profile, at makakuha ng gabay upang maiwasan ang mga malulubhang sakit.'
                                : 'Assess your general health, establish a digital health profile, and get professional guidance to prevent severe chronic illnesses.'}
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                          <CardContent className="p-5">
                            <h5 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                              <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                              {isFil
                                ? 'Pamamahala ng Chronic Diseases'
                                : 'Chronic Disease Management'}
                            </h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                              {isFil
                                ? 'Tuloy-tuloy na pagsubaybay at payong medikal para sa mga may mataas na presyon ng dugo (hypertension), diabetes, at mataas na cholesterol.'
                                : 'Continuous monitoring and medical guidance for individuals with high blood pressure (hypertension), diabetes, and high cholesterol.'}
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                          <CardContent className="p-5">
                            <h5 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                              <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                              {isFil
                                ? 'Digital Health Profiling'
                                : 'Digital Health Profiling'}
                            </h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                              {isFil
                                ? 'Ligtas at komprehensibong pag-upload ng inyong rekord sa PhilHealth Electronic Health Record (EHR) upang mabilis na ma-track ang inyong kasaysayan ng sakit.'
                                : 'Secure and comprehensive uploading of your records to the PhilHealth Electronic Health Record (EHR) system to track your clinical history.'}
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                          <CardContent className="p-5">
                            <h5 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                              <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                              {isFil
                                ? 'Kwalipikadong Reseta'
                                : 'Qualified Prescriptions'}
                            </h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                              {isFil
                                ? 'Agad na nakakakuha ng electronic prescription mula sa doktor upang magamit sa pag-claim ng libreng gamot at libreng laboratoryo.'
                                : 'Instantly receive e-prescriptions from your physician to claim your free laboratory diagnostics and outpatient medications.'}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}

                  {activeTab === 'labs' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 text-emerald-900 dark:text-emerald-200 mb-4">
                        <h4 className="font-extrabold text-base mb-1">
                          {isFil
                            ? '13 Sakop na Diagnostic at Outpatient Laboratories'
                            : '13 Covered Outpatient & Diagnostic Lab Tests'}
                        </h4>
                        <p className="text-xs leading-relaxed">
                          {isFil
                            ? 'Kung nireseta ng inyong YAKAP doctor, maaari ninyong makuha ang mga sumusunod na diagnostic tests nang ganap na libre sa laboratoryo ng Indang RHU.'
                            : 'If prescribed by your YAKAP physician, you can undergo the following 13 laboratory procedures completely free of charge at the Indang RHU.'}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {translatedLabTests.map(test => (
                          <div
                            key={test.id}
                            className="p-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 hover:bg-blue-50/20 dark:hover:bg-blue-900/5 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-extrabold text-xs shrink-0 mt-0.5">
                                ✓
                              </span>
                              <div>
                                <h5 className="font-bold text-sm text-gray-900 dark:text-white leading-tight mb-1">
                                  {test.name}
                                </h5>
                                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                                  {test.layDescription}
                                </p>
                                <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
                                  {test.details}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'gamot' && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="p-5 rounded-2xl bg-amber-50/40 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-950/30 text-amber-900 dark:text-amber-200">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-xl shrink-0">
                            <Info className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-extrabold text-base mb-1">
                              {isFil
                                ? 'Up to ₱20,000 Outpatient Medicine (GAMOT Package)'
                                : 'Up to ₱20,000 Outpatient Medicine (GAMOT Package)'}
                            </h4>
                            <p className="text-xs leading-relaxed mb-3">
                              {isFil
                                ? 'Bawat rehistradong mamamayan ay may garantisadong allowance na nagkakahalaga ng hanggang ₱20,000 kada taon para sa mga kailangang outpatient maintenance at acute medications.'
                                : 'Every registered citizen receives an outpatient medication allowance of up to ₱20,000 per year to cover prescribed chronic maintenance drugs and acute medications.'}
                            </p>
                            <div className="text-[11px] space-y-1 text-amber-800 dark:text-amber-300">
                              <p>
                                {isFil
                                  ? '• Ang mga gamot ay ibinibigay sa RHU pharmacy o kasosyong botika.'
                                  : '• Medications are dispensed from the RHU pharmacy or accredited local partner drugstores.'}
                              </p>
                              <p>
                                {isFil
                                  ? '• Kinakailangan ang valid na e-prescription mula sa inyong rehistradong YAKAP doctor.'
                                  : '• A valid e-prescription registered in the YAKAP portal by your physician is required.'}
                              </p>
                              <p>
                                {isFil
                                  ? '• Ang halaga ng nakuhang gamot ay awtomatikong ibabawas sa inyong taunang ₱20,000 allowance.'
                                  : '• Dispensed medicine costs are automatically deducted from your annual ₱20,000 limit.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 border border-gray-100 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800/40">
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3">
                          {isFil
                            ? 'Paano I-claim ang Libreng Gamot:'
                            : 'How to Claim Your Free Medications:'}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-extrabold uppercase mb-2">
                              {isFil ? 'Hakbang 1' : 'Step 1'}
                            </span>
                            <h5 className="font-bold text-xs text-gray-800 dark:text-white mb-1">
                              {isFil ? 'Magpasuri sa RHU' : 'Consult a Doctor'}
                            </h5>
                            <p className="text-[10px] text-gray-600 dark:text-gray-300">
                              {isFil
                                ? 'Magpa-checkup sa inyong YAKAP doctor sa Rural Health Unit.'
                                : 'Visit your assigned YAKAP primary care doctor at the Rural Health Unit.'}
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-extrabold uppercase mb-2">
                              {isFil ? 'Hakbang 2' : 'Step 2'}
                            </span>
                            <h5 className="font-bold text-xs text-gray-800 dark:text-white mb-1 font-bold">
                              {isFil
                                ? 'Kumuha ng Reseta'
                                : 'Receive e-Prescription'}
                            </h5>
                            <p className="text-[10px] text-gray-600 dark:text-gray-300">
                              {isFil
                                ? 'Kuhanin ang e-prescription na nakatala sa inyong profile.'
                                : 'Get your digital electronic prescription recorded in your health profile.'}
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-extrabold uppercase mb-2">
                              {isFil ? 'Hakbang 3' : 'Step 3'}
                            </span>
                            <h5 className="font-bold text-xs text-gray-800 dark:text-white mb-1">
                              {isFil
                                ? 'Pumunta sa Pharmacy'
                                : 'Claim at Pharmacy'}
                            </h5>
                            <p className="text-[10px] text-gray-600 dark:text-gray-300">
                              {isFil
                                ? 'Ipakita ang reseta sa RHU Pharmacy upang makuha ng libre ang gamot.'
                                : 'Present your prescription to the RHU Pharmacy dispensary window to receive it free.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Module 2: Covered Medicine Finder */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
                      <Search className="h-6 w-6" />
                    </div>
                    <div>
                      <Heading
                        level={2}
                        className="text-xl sm:text-2xl font-bold mb-0 text-gray-900 dark:text-white"
                      >
                        {isFil
                          ? 'Tagahanap ng Libreng Gamot'
                          : 'Covered Medicine Finder'}
                      </Heading>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {isFil
                          ? 'Hanapin kung sakop ng libreng PhilHealth YAKAP ang iyong inireresetang gamot.'
                          : 'Search to check if your prescribed medication is fully covered under the PhilHealth YAKAP program.'}
                      </p>
                      <div className="mt-2.5 flex items-center gap-1.5 p-2 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 text-[10px] sm:text-xs text-amber-800 dark:text-amber-300 font-medium">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
                        {isFil
                          ? 'Ang listahang ito ay gabay lamang. Mahigpit na ipinagbabawal ang self-medication nang walang reseta ng doktor.'
                          : 'For reference only. Self-medication without an official physician prescription is strictly prohibited.'}
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex px-3 py-1 text-xs font-bold rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 self-start sm:self-center">
                    {isFil
                      ? '75+ Generic Formulations Sakop'
                      : '75+ Covered Generic Formulations'}
                  </span>
                </div>

                {/* Medicine Search Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="sm:col-span-2 relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      value={medSearch}
                      onChange={e => setMedSearch(e.target.value)}
                      placeholder={
                        isFil
                          ? 'I-type ang pangalan ng gamot (Hal. Amlodipine, Metformin)...'
                          : 'Type the name of the medicine (e.g. Amlodipine, Metformin)...'
                      }
                      className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <select
                      value={selectedMedCategory}
                      onChange={e => setSelectedMedCategory(e.target.value)}
                      className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl px-3 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                    >
                      {MEDICINE_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>
                          {cat === 'All'
                            ? isFil
                              ? 'Lahat ng Kategorya'
                              : 'All Categories'
                            : getCategoryName(cat, isFil)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Medicine Grid */}
                <div className="max-h-[480px] overflow-y-auto pr-2 custom-scrollbar border border-gray-100 dark:border-gray-700/60 rounded-2xl bg-gray-50/50 dark:bg-gray-855/10">
                  {filteredMedicines.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                      <AlertCircle className="h-10 w-10 text-amber-500 mb-3" />
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                        {isFil
                          ? 'Walang Nahanap na Gamot'
                          : 'No Medications Found'}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm">
                        {isFil ? (
                          <>
                            Hindi namin nahanap ang{' '}
                            <strong className="font-semibold text-gray-800 dark:text-gray-200">
                              "{medSearch}"
                            </strong>{' '}
                            sa aming listahan. Tiyaking tama ang spelling o
                            subukan ang ibang kategorya.
                          </>
                        ) : (
                          <>
                            We could not find{' '}
                            <strong className="font-semibold text-gray-800 dark:text-gray-200">
                              "{medSearch}"
                            </strong>{' '}
                            in our database. Please verify the spelling or
                            select another therapeutic category.
                          </>
                        )}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                      {filteredMedicines.map((med, index) => (
                        <div
                          key={`${med.generic}-${med.strength}-${index}`}
                          className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col justify-between hover:shadow-md transition-shadow group"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="px-2 py-0.5 text-[9px] font-extrabold rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 uppercase tracking-wide">
                                {med.category}
                              </span>
                              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{' '}
                                {isFil ? '100% Libre' : '100% Free'}
                              </span>
                            </div>
                            <h4 className="text-sm font-black text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {med.generic}
                            </h4>
                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mt-0.5">
                              {med.strength}
                            </p>
                            <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                              {med.use}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Area: Interactive Enrollment Wizard & Contact Details */}
            <div className="space-y-8">
              {/* Module 3: Step-by-Step Enrollment Wizard */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/60">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl w-fit">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Heading
                      level={2}
                      className="text-lg font-extrabold mb-0 text-gray-900 dark:text-white leading-tight break-words"
                    >
                      {isFil ? 'Gabay sa Pagpaparehistro' : 'Enrollment Wizard'}
                    </Heading>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                      {isFil
                        ? 'Sundan ang gabay para ma-activate ang inyong benepisyo.'
                        : 'Follow this timeline to register and activate your health coverage.'}
                    </p>
                  </div>
                </div>

                {/* Pathway Toggle */}
                <div className="grid grid-cols-2 gap-2 bg-gray-100 dark:bg-gray-700/60 p-1.5 rounded-2xl mb-6">
                  <button
                    onClick={() => setEnrollmentPath('online')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                      enrollmentPath === 'online'
                        ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-gray-500 dark:text-gray-300 hover:text-gray-800'
                    }`}
                  >
                    <Smartphone className="h-3.5 w-3.5" />{' '}
                    {isFil ? 'Online (App)' : 'Online (App)'}
                  </button>
                  <button
                    onClick={() => setEnrollmentPath('inperson')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                      enrollmentPath === 'inperson'
                        ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-gray-500 dark:text-gray-300 hover:text-gray-800'
                    }`}
                  >
                    <UserCheck className="h-3.5 w-3.5" />{' '}
                    {isFil ? 'Sa Personal (RHU)' : 'In-Person (RHU)'}
                  </button>
                </div>

                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1.5">
                    <span>
                      {isFil
                        ? 'Katayuan ng Pagpaparehistro'
                        : 'Registration Checklist Progress'}
                    </span>
                    <span>
                      {enrollmentPath === 'online'
                        ? isFil
                          ? `${onlineCompletedCount}/3 Hakbang`
                          : `${onlineCompletedCount}/3 Steps`
                        : isFil
                          ? `${inPersonCompletedCount}/3 Hakbang`
                          : `${inPersonCompletedCount}/3 Steps`}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300"
                      style={{
                        width:
                          enrollmentPath === 'online'
                            ? `${(onlineCompletedCount / 3) * 100}%`
                            : `${(inPersonCompletedCount / 3) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Steps Details */}
                {enrollmentPath === 'online' ? (
                  <div className="space-y-6">
                    {/* Step 1 */}
                    <div
                      className={`relative pl-8 pb-1 border-l-2 transition-all duration-300 ${onlineChecklist.step1 ? 'border-emerald-500' : 'border-gray-200 dark:border-gray-700'}`}
                    >
                      <button
                        onClick={() => handleOnlineToggle('step1')}
                        className={`absolute -left-[13px] top-0 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors cursor-pointer ${
                          onlineChecklist.step1
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 hover:border-blue-500'
                        }`}
                      >
                        {onlineChecklist.step1 ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <span className="text-[10px] font-bold">1</span>
                        )}
                      </button>
                      <div className="flex flex-col">
                        <div className="flex justify-between items-start">
                          <h4 className="font-extrabold text-xs text-gray-900 dark:text-white leading-tight">
                            {isFil
                              ? 'Mag-download at Magrehistro'
                              : 'Download & Register'}
                          </h4>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold uppercase shrink-0">
                            eGovPH
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                          {isFil ? (
                            <>
                              I-download ang <strong>eGovPH app</strong> sa App
                              Store o Google Play at kumpletuhin ang
                              pagpaparehistro o kaya ay pumunta sa PhilHealth
                              Member Portal.
                            </>
                          ) : (
                            <>
                              Download the official{' '}
                              <strong>eGovPH superapp</strong> on your
                              smartphone or visit the secure PhilHealth portal
                              to complete your account setup.
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div
                      className={`relative pl-8 pb-1 border-l-2 transition-all duration-300 ${onlineChecklist.step2 ? 'border-emerald-500' : 'border-gray-200 dark:border-gray-700'}`}
                    >
                      <button
                        onClick={() => handleOnlineToggle('step2')}
                        className={`absolute -left-[13px] top-0 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors cursor-pointer ${
                          onlineChecklist.step2
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 hover:border-blue-500'
                        }`}
                      >
                        {onlineChecklist.step2 ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <span className="text-[10px] font-bold">2</span>
                        )}
                      </button>
                      <div className="flex flex-col">
                        <h4 className="font-extrabold text-xs text-gray-900 dark:text-white leading-tight">
                          {isFil
                            ? 'Piliin ang Indang RHU'
                            : 'Select Indang RHU'}
                        </h4>
                        <p className="text-[10px] text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                          {isFil ? (
                            <>
                              Sa YAKAP / Konsulta section, hanapin at i-select
                              ang{' '}
                              <strong>Indang Rural Health Unit (RHU)</strong> o{' '}
                              <strong>Indang Municipal Health Office</strong>{' '}
                              bilang inyong itinalagang primary care clinic.
                              I-save o screenshot ang kumpirmasyon.
                            </>
                          ) : (
                            <>
                              In the YAKAP/Konsulta section, search and select
                              the{' '}
                              <strong>Indang Rural Health Unit (RHU)</strong> or{' '}
                              <strong>Municipal Health Office</strong> as your
                              primary clinic. Save or screenshot the
                              confirmation.
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative pl-8">
                      <button
                        onClick={() => handleOnlineToggle('step3')}
                        className={`absolute -left-[13px] top-0 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors cursor-pointer ${
                          onlineChecklist.step3
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 hover:border-blue-500'
                        }`}
                      >
                        {onlineChecklist.step3 ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <span className="text-[10px] font-bold">3</span>
                        )}
                      </button>
                      <div className="flex flex-col">
                        <h4 className="font-extrabold text-xs text-gray-900 dark:text-white leading-tight">
                          {isFil
                            ? 'Unang Pagbisita (FPE)'
                            : 'First Patient Encounter (FPE)'}
                        </h4>
                        <p className="text-[10px] text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                          {isFil ? (
                            <>
                              Pumunta sa Indang RHU para sa inyong{' '}
                              <strong>First Patient Encounter (FPE)</strong>{' '}
                              upang ma-record ang inyong timbang, presyon, at
                              medical profile. Pagkatapos nito, ganap nang
                              aktibo ang inyong libreng laboratoryo at gamot!
                            </>
                          ) : (
                            <>
                              Visit the Indang RHU for your initial screening.
                              RHU staff will record your vitals and upload your
                              digital profile to activate your free diagnostics
                              and medicine benefits!
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Step 1 */}
                    <div
                      className={`relative pl-8 pb-1 border-l-2 transition-all duration-300 ${inPersonChecklist.step1 ? 'border-emerald-500' : 'border-gray-200 dark:border-gray-700'}`}
                    >
                      <button
                        onClick={() => handleInPersonToggle('step1')}
                        className={`absolute -left-[13px] top-0 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors cursor-pointer ${
                          inPersonChecklist.step1
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 hover:border-blue-500'
                        }`}
                      >
                        {inPersonChecklist.step1 ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <span className="text-[10px] font-bold">1</span>
                        )}
                      </button>
                      <div className="flex flex-col">
                        <h4 className="font-extrabold text-xs text-gray-900 dark:text-white leading-tight">
                          {isFil
                            ? 'Ihanda ang mga Dokumento'
                            : 'Prepare Documents'}
                        </h4>
                        <p className="text-[10px] text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                          {isFil ? (
                            <>
                              Dalhin ang iyong{' '}
                              <strong>PhilHealth ID o PIN</strong>, isang (1)
                              valid photo ID, at{' '}
                              <strong>Member Data Record (MDR)</strong> kung may
                              kasamang dependents.
                            </>
                          ) : (
                            <>
                              Bring your{' '}
                              <strong>PhilHealth ID card or PIN number</strong>,
                              one (1) valid government photo ID, and your{' '}
                              <strong>Member Data Record (MDR)</strong> if
                              enrolling qualified dependents.
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div
                      className={`relative pl-8 pb-1 border-l-2 transition-all duration-300 ${inPersonChecklist.step2 ? 'border-emerald-500' : 'border-gray-200 dark:border-gray-700'}`}
                    >
                      <button
                        onClick={() => handleInPersonToggle('step2')}
                        className={`absolute -left-[13px] top-0 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors cursor-pointer ${
                          inPersonChecklist.step2
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 hover:border-blue-500'
                        }`}
                      >
                        {inPersonChecklist.step2 ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <span className="text-[10px] font-bold">2</span>
                        )}
                      </button>
                      <div className="flex flex-col">
                        <h4 className="font-extrabold text-xs text-gray-900 dark:text-white leading-tight">
                          {isFil
                            ? 'Bisitahin ang Indang RHU'
                            : 'Visit Indang RHU'}
                        </h4>
                        <p className="text-[10px] text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                          {isFil ? (
                            <>
                              Pumunta sa registration window sa{' '}
                              <strong>
                                Indang RHU o Municipal Health Office
                              </strong>
                              . Sagutan ang PhilHealth YAKAP Registration Form
                              at isumite ito sa mga health workers.
                            </>
                          ) : (
                            <>
                              Go to the enrollment desk at the{' '}
                              <strong>
                                Indang RHU or Municipal Health Office
                              </strong>
                              . Fill out and submit the physical YAKAP
                              registration form.
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative pl-8">
                      <button
                        onClick={() => handleInPersonToggle('step3')}
                        className={`absolute -left-[13px] top-0 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors cursor-pointer ${
                          inPersonChecklist.step3
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 hover:border-blue-500'
                        }`}
                      >
                        {inPersonChecklist.step3 ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <span className="text-[10px] font-bold">3</span>
                        )}
                      </button>
                      <div className="flex flex-col">
                        <h4 className="font-extrabold text-xs text-gray-900 dark:text-white leading-tight">
                          {isFil ? 'Magsagawa ng FPE' : 'Complete Vitals & FPE'}
                        </h4>
                        <p className="text-[10px] text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                          {isFil ? (
                            <>
                              Kausapin ang doktor sa RHU para sa inyong initial
                              physical screening at health profiling (FPE).
                              Awtomatikong mai-encode ang inyong libreng
                              coverage sa system!
                            </>
                          ) : (
                            <>
                              Undergo your initial clinical consultation and
                              vitals check (FPE). The RHU staff will encode your
                              registration to instantly unlock your benefits!
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Complete Celebration card */}
                {((enrollmentPath === 'online' && onlineCompletedCount === 3) ||
                  (enrollmentPath === 'inperson' &&
                    inPersonCompletedCount === 3)) && (
                  <div className="mt-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 text-emerald-900 dark:text-emerald-300 text-center animate-fade-in">
                    <p className="text-xs font-black mb-1">
                      {isFil
                        ? '🎉 Mahusay! Handa ka na!'
                        : '🎉 Congratulations! You are Ready!'}
                    </p>
                    <p className="text-[10px]">
                      {isFil
                        ? 'Kumpleto na ang inyong paghahanda. Bisitahin ang Rural Health Unit (RHU) ng Indang Cavite upang magamit ang inyong libreng diagnostic tests at gamot!'
                        : 'Your registration preparation is complete. Visit the Indang Rural Health Unit to claim your free check-ups, lab tests, and outpatient medications!'}
                    </p>
                  </div>
                )}
              </div>

              {/* Module 4: Official Municipal Contact Details Panel (Strictly Genuine) */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/60">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl w-fit">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Heading
                      level={2}
                      className="text-lg font-extrabold mb-0 text-gray-900 dark:text-white leading-tight break-words"
                    >
                      {isFil ? 'Makipag-ugnayan' : 'Contact Information'}
                    </Heading>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                      {isFil
                        ? 'Mga opisyal at totoong contact details ng Indang Health Office at PhilHealth Cavite.'
                        : 'Official genuine contacts of the Indang Rural Health Unit and PhilHealth Cavite.'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* RHU Info */}
                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700">
                    <h4 className="font-extrabold text-xs text-gray-900 dark:text-white mb-2 uppercase tracking-wider text-blue-700 dark:text-blue-400">
                      Indang Rural Health Unit (RHU)
                    </h4>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                        <MapPin className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                        <span>
                          {isFil
                            ? 'Indang Municipal Hall Compound, Poblacion 1, Indang, Cavite (Malapit sa Municipal Plaza)'
                            : 'Indang Municipal Hall Compound, Poblacion 1, Indang, Cavite (Near Municipal Plaza)'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-gray-600 dark:text-gray-300 group">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                          <a
                            href="tel:0468401705"
                            className="hover:underline font-medium hover:text-blue-600"
                          >
                            (046) 840-1705
                          </a>
                        </div>
                        <button
                          onClick={() => handleCopy('(046) 840-1705', 'tel1')}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-400 hover:text-gray-600 transition-colors pointer-events-auto cursor-pointer"
                        >
                          {copiedText === 'tel1' ? (
                            <Check className="h-3 w-3 text-emerald-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-gray-600 dark:text-gray-300 group">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                          <a
                            href="tel:09777666707"
                            className="hover:underline font-medium hover:text-blue-600"
                          >
                            0977-766-6707
                          </a>
                        </div>
                        <button
                          onClick={() => handleCopy('0977-766-6707', 'mob1')}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-400 hover:text-gray-600 transition-colors pointer-events-auto cursor-pointer"
                        >
                          {copiedText === 'mob1' ? (
                            <Check className="h-3 w-3 text-emerald-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-gray-600 dark:text-gray-300 group">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                          <a
                            href="tel:09281234567"
                            className="hover:underline font-medium hover:text-blue-600"
                          >
                            0928-123-4567
                          </a>
                        </div>
                        <button
                          onClick={() => handleCopy('0928-123-4567', 'mob2')}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-400 hover:text-gray-600 transition-colors pointer-events-auto cursor-pointer"
                        >
                          {copiedText === 'mob2' ? (
                            <Check className="h-3 w-3 text-emerald-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-gray-600 dark:text-gray-300 group">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400 shrink-0" />
                          <a
                            href="mailto:health@indang.gov.ph"
                            className="hover:underline font-medium hover:text-blue-600"
                          >
                            health@indang.gov.ph
                          </a>
                        </div>
                        <button
                          onClick={() =>
                            handleCopy('health@indang.gov.ph', 'mail1')
                          }
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-400 hover:text-gray-600 transition-colors pointer-events-auto cursor-pointer"
                        >
                          {copiedText === 'mail1' ? (
                            <Check className="h-3 w-3 text-emerald-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Philhealth Cavite Office */}
                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700">
                    <h4 className="font-extrabold text-xs text-gray-900 dark:text-white mb-2 uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      {isFil
                        ? 'PhilHealth Cavite Opisina'
                        : 'PhilHealth Cavite Local Office'}
                    </h4>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between text-gray-600 dark:text-gray-300 group">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                          <a
                            href="tel:0464190740"
                            className="hover:underline font-medium hover:text-blue-600"
                          >
                            (046) 419-0740
                          </a>
                        </div>
                        <button
                          onClick={() => handleCopy('(046) 419-0740', 'telc')}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-400 hover:text-gray-600 transition-colors pointer-events-auto cursor-pointer"
                        >
                          {copiedText === 'telc' ? (
                            <Check className="h-3 w-3 text-emerald-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-gray-600 dark:text-gray-300 group">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400 shrink-0" />
                          <a
                            href="mailto:cavite.lho@philhealth.gov.ph"
                            className="hover:underline font-medium hover:text-blue-600"
                          >
                            cavite.lho@philhealth.gov.ph
                          </a>
                        </div>
                        <button
                          onClick={() =>
                            handleCopy('cavite.lho@philhealth.gov.ph', 'mailc')
                          }
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-400 hover:text-gray-600 transition-colors pointer-events-auto cursor-pointer"
                        >
                          {copiedText === 'mailc' ? (
                            <Check className="h-3 w-3 text-emerald-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 24/7 Hotline */}
                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700">
                    <h4 className="font-extrabold text-xs text-gray-900 dark:text-white mb-2 uppercase tracking-wider text-gray-700 dark:text-gray-400">
                      {isFil
                        ? 'PhilHealth 24/7 Sentro ng Aksyon'
                        : 'PhilHealth 24/7 Action Center'}
                    </h4>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between text-gray-600 dark:text-gray-300 group">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                          <a
                            href="tel:0286622588"
                            className="hover:underline font-medium hover:text-blue-600"
                          >
                            (02) 8662-2588
                          </a>
                        </div>
                        <button
                          onClick={() => handleCopy('(02) 8662-2588', 'telp')}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-400 hover:text-gray-600 transition-colors pointer-events-auto cursor-pointer"
                        >
                          {copiedText === 'telp' ? (
                            <Check className="h-3 w-3 text-emerald-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-gray-600 dark:text-gray-300 group">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-400 shrink-0" />
                          <span>
                            SMS Callback:{' '}
                            <a
                              href="sms:09988572957"
                              className="hover:underline font-medium hover:text-blue-600"
                            >
                              0998-857-2957
                            </a>
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopy('0998-857-2957', 'smsp')}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-400 hover:text-gray-600 transition-colors pointer-events-auto cursor-pointer"
                        >
                          {copiedText === 'smsp' ? (
                            <Check className="h-3 w-3 text-emerald-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Module 5: Sleek FAQ Accordion Section */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700/60 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Heading
                level={2}
                className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white"
              >
                {isFil
                  ? 'Mga Madalas Itanong (FAQ)'
                  : 'Frequently Asked Questions (FAQ)'}
              </Heading>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isFil
                  ? 'Mga karaniwang tanong tungkol sa PhilHealth YAKAP sa Indang Cavite.'
                  : 'Common inquiries regarding the PhilHealth YAKAP program in Indang, Cavite.'}
              </p>
            </div>

            <div className="space-y-4">
              {FAQs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-b-0"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-left py-3 cursor-pointer text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors pointer-events-auto"
                  >
                    <span className="font-extrabold text-sm sm:text-base pr-4">
                      {faq.q}
                    </span>
                    {openFaqIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 shrink-0" />
                    )}
                  </button>
                  {openFaqIndex === index && (
                    <div className="pl-1 pr-6 pb-2 animate-slide-in">
                      <p className="text-xs sm:text-sm text-gray-650 dark:text-gray-300 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Module 6: Sleek References & Validation Section */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700/60 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <Heading
                  level={2}
                  className="text-xl sm:text-2xl font-bold mb-0 text-gray-900 dark:text-white"
                >
                  {isFil
                    ? 'Opisyal na Sanggunian at Pagpapatunay'
                    : 'Official References & Validation'}
                </Heading>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {isFil
                    ? 'Kung nais mong patunayan o suriin ang mga alituntunin ng programa sa iyong sarili.'
                    : 'If you wish to independently verify the official policies and guidelines governing this program.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://www.philhealth.gov.ph/yakap/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 bg-gray-50 dark:bg-gray-800/40 hover:bg-white dark:hover:bg-gray-800 transition-all group flex gap-3 pointer-events-auto cursor-pointer"
              >
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl shrink-0 h-11 w-11 flex items-center justify-center font-bold">
                  🌐
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-950 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {isFil
                      ? 'PhilHealth YAKAP Portal'
                      : 'PhilHealth YAKAP Portal'}
                  </h4>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 leading-relaxed">
                    www.philhealth.gov.ph/yakap/
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                    {isFil
                      ? 'Opisyal na portal upang basahin ang pambansang mga benepisyo at patakaran ng YAKAP/Konsulta.'
                      : 'Dedicated national portal detailing full YAKAP/Konsulta benefits, capitation rates, and provider lists.'}
                  </p>
                </div>
              </a>

              <a
                href="https://e.gov.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 bg-gray-50 dark:bg-gray-800/40 hover:bg-white dark:hover:bg-gray-800 transition-all group flex gap-3 pointer-events-auto cursor-pointer"
              >
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0 h-11 w-11 flex items-center justify-center font-bold">
                  📱
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-950 dark:text-white leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-450 transition-colors">
                    {isFil
                      ? 'eGovPH Pambansang Portal'
                      : 'eGovPH National Portal'}
                  </h4>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 leading-relaxed">
                    e.gov.ph
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                    {isFil
                      ? 'Ang nag-iisang opisyal na mobile app ng gobyerno para sa mabilis na pagpaparehistro at pag-link ng iyong health records.'
                      : 'The singular unified national mobile application to register and link your PhilHealth primary care credentials.'}
                  </p>
                </div>
              </a>

              <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 flex gap-3">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-xl shrink-0 h-11 w-11 flex items-center justify-center font-bold">
                  📄
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-950 dark:text-white leading-tight">
                    PhilHealth Circular No. 2023-0013
                  </h4>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                    Universal Health Care (UHC) Implementations
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                    {isFil
                      ? 'Ang pambansang regulasyon na nagtatakda ng mga libreng diagnostic laboratory at ₱20,000 GAMOT package sa mga primary care clinics.'
                      : 'The governing national circular outlining covered outpatient procedures, capitation funding, and prescription limits.'}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 flex gap-3">
                <div className="p-3 bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-xl shrink-0 h-11 w-11 flex items-center justify-center font-bold">
                  ⚖️
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-950 dark:text-white leading-tight">
                    Republic Act No. 11223 (UHC Law)
                  </h4>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                    Philippine Universal Health Care Act
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                    {isFil
                      ? 'Ang batas na nagbibigay-garantiya sa bawat Pilipino ng karapatan sa abot-kaya at de-kalidad na pangangalagang medikal nang walang babayaran.'
                      : 'The Philippine Universal Health Care Act mandating immediate primary care registration and zero copayments for all citizens.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* LGU Medical Disclaimer Block */}
          <div className="mt-12 max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-amber-50/40 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/30">
            <div className="flex gap-4">
              <div className="p-3 bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 rounded-2xl shrink-0 h-12 w-12 flex items-center justify-center font-bold">
                ⚠️
              </div>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-amber-950 dark:text-amber-300 mb-2 leading-tight uppercase tracking-wider">
                  {isFil
                    ? 'Opisyal na Paunawa at Medikal na Disclaimer'
                    : 'Official Notice & Medical Disclaimer'}
                </h4>
                <div className="text-[11px] sm:text-xs text-amber-900/90 dark:text-amber-400/90 space-y-2 leading-relaxed font-medium">
                  <p>
                    {isFil
                      ? '1. Ang lahat ng nilalamang medikal na nakalagay sa interactive portal na ito, kabilang ang listahan ng 13 diagnostic tests at 77 generic na gamot, ay inihanda bilang pangkalahatang impormasyon lamang para sa mga residente ng Indang, Cavite. Hindi ito inilaan bilang propesyonal na payong medikal o kapalit ng konsultasyon sa inyong doktor.'
                      : '1. All medical content published on this interactive portal, including the reference registry of 13 diagnostic procedures and 77 generic medications, is curated solely for general public education and reference for the residents of Indang, Cavite. It is not intended to replace professional healthcare consultations, diagnosis, or treatment.'}
                  </p>
                  <p>
                    {isFil
                      ? '2. Ang Indang Municipal Health Office (MHO) at Rural Health Unit (RHU) ang tanging may awtoridad na mag-diagnose, mag-reseta, at magbigay ng libreng gamot alinsunod sa mga alituntunin ng PhilHealth at Universal Health Care (UHC) Circular 2023-0013.'
                      : '2. The Indang Municipal Health Office (MHO) and the Rural Health Unit (RHU) hold the sole clinical authority to diagnose, prescribe, and dispense medications under the strict guidelines of PhilHealth and the Universal Health Care (UHC) Circular 2023-0013.'}
                  </p>
                  <p>
                    {isFil
                      ? '3. Anumang maling paggamit ng impormasyon, self-medication, o pag-aabuso sa portal na ito ay hindi pananagutan ng Lokal na Pamahalaan ng Indang. Mangyaring bumisita nang personal sa RHU para sa ligtas, legal, at tamang pangangalagang pangkalusugan.'
                      : '3. Any misuse of information, self-medication, or unauthorized distribution of pharmaceutical listings on this portal is the sole responsibility of the user. The Local Government Unit of Indang accepts no liability. Please consult the nearest Rural Health Unit clinic for professional clinical assessments.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Back Button */}
          <div className="flex justify-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-350 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl text-sm font-bold shadow-sm transition-all pointer-events-auto"
            >
              {isFil ? '← Bumalik sa mga Serbisyo' : '← Back to Services'}
            </Link>
          </div>
        </Section>
      </div>
    </>
  );
}
