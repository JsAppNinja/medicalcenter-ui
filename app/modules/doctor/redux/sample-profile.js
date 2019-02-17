export default {
  uuid: 'dr-kevin-stone',

  // overview
  name: 'Dr. Kevin Stone, MD',
  title: 'Orthopedic Surgeon',
  paid: true,
  experience: 30,
  lowest_consultation_price: '$150',
  city: 'San Francisco',
  state: 'CA',
  country: 'USA',
  zipcode: '94123',
  street: '3727 Buchanan St',
  phone: '443-475-0157',
  specialities: 'Orthopedic Surgery',
  photo_url: 'https://kangaroo-health-directory.imgix.net/stone+profile+picture.jpg',
  website: 'https://www.stoneclinic.com',
  bio: 'Dr. Kevin R. Stone is an orthopedic surgeon specializing in knee, shoulder and ankle repair, reconstruction and biologic joint replacement. The Stone Clinic is a leading center for meniscus replacement, stem cell paste grafting for arthritis, ligament reconstruction, knee, shoulder and ankle injuries. Dr. Stone pioneered stem cell paste grafting for articular cartilage injuries and meniscus replacement for pristine and arthritic knees. The Clinic and The Stone Research Foundation focus on advanced orthopedic techniques help people become fitter, faster and stronger than before their injuries.',

  // reviews
  rating: '5.0',
  review_list: [
    {
      rating: '5.0',
      date: '2018-02-20',
      name: 'Judy Newton',
      title: 'The care at the Stone Clinic is exquisite',
      description: 'The care at the Stone Clinic is exquisite. Dr. Stone and staff go out of their way to develop techniques to reduce or eliminate pain and anxiety. I am SO impressed with their skill, patience, compassion and kindness! Their medicine is cutting edge and they keep striving to improve outcomes. The outcome of my surgery is excellent. I have started hiking trails and cross country skiing again! I am so grateful to have had the opportunity to be a patient of this clinic team!',
      preferred: 1,
    },
    {
      rating: '5.0',
      date: '2018-06-03',
      description: 'It was my one year check up post-surgery and I couldn\'t believe that my "old, bad knee" now feels as good as the one that didn\'t have a problem. Terrific surgical success. What\'s more, I felt the office staff, from reception/patient services, to the nursing staff, to the technician and physical therapists were thoughtful, friendly and highly professional.',
      name: 'Anned',
      preferred: 0,
    },
    {
      rating: '5.0',
      date: '2018-05-11',
      description: 'I came in with a problem with my right knee and. The Stone Clinic took the time to completely understand my condition and in detail explain how it should be addressed which made me comfortable with the solution.',
      name: 'Leeb',
      preferred: 0,
    },
    {
      rating: '5.0',
      date: '2018-04-23',
      description: 'After visiting the clinic and with Dr. Stone I am convinced I am in the best hands possible for my knee problem.',
      name: 'Karenp',
      preferred: 0,
    },
    {
      rating: '5.0',
      date: '2018-04-21',
      description: 'I have been a patient of Dr. Stone’s for almost 30 years and never would want to see another orthopod!',
      name: 'Richards',
      preferred: 0,
    },
    {
      rating: '5.0',
      date: '2018-03-02',
      description: 'Very positive. All the staff were very professional. I loved the Name Tags on the employees because I’m bad at recalling people’s names I just met. The Clinc was very clean. Also the women were well dressed and genuine. The work is about the customer and nothing else. The staff do not have their cell phns out at their desk. This ofc is ready for helping the customer needs.',
      name: 'Robertl',
      preferred: 0,
    },
    {
      rating: '5.0',
      date: '2018-03-01',
      description: 'I was very pleased with my experience at The Stone Clinic. Dr. Stone and his staff were very helpful in helping me understand my orthopedic issues.',
      name: 'William "Bill"F, Powell Butte',
      preferred: 0,
    },
    {
      rating: '5.0',
      date: '2018-02-20',
      description: 'The patient care was unparalleled. The staff was professional and made it fun to work out. I believe such care and quality of service comes from the top. Dr. Stone, thank you.',
      name: 'Edwardw',
      preferred: 0,
    },
  ],

  // bundles
  bundles: [
    {
      uuid: 'bundle-1',
      name: 'Phone Consultation',
      price: '$150',
      items: [
        'No financing available',
        'For patients who are not local only',
      ],
    },
    {
      uuid: 'bundle-2',
      name: 'In-clinic Consultation',
      price: '$500',
      items: [
        'No financing available',
        'For patients who are not local only',
      ],
    },
    {
      uuid: 'bundle-3',
      name: 'X-ray',
      description: 'No financing available',
      price: '$200-$350',
      items: [
        'No financing available',
      ],
    },
    {
      uuid: 'bundle-4',
      name: 'MRI',
      price: '$2200-$2700',
      items: [
        'Starting at $92 per month for 24 months* (*promotional period)',
      ],
    },
    {
      uuid: 'bundle-5',
      name: 'Stem cell injection package',
      price: '$4300-$4700',
      items: [
        'Starting at $180 per month for 24 months* (promotional period)',
      ],
    },
    {
      uuid: 'bundle-6',
      name: 'Pain injection',
      price: '$700-$800',
      items: [
        'No financing available',
      ],
    },
    {
      uuid: 'bundle-7',
      name: 'Physical therapy',
      price: '$500',
      items: [
        'One week of physical therapy including three sessions',
        'No financing available',
      ],
    },
    {
      uuid: 'bundle-8',
      name: 'Partial knee replacement',
      price: '$17,000-$55,000*',
      items: [
        'Starting at $709 per month for 24 months* (*promotional period)',
        'The price only covers fees for physicians and physician assistants',
        'The price does not include facility fees, anesthesiologist fees, implant costs, or in procedure radiology',
      ],
    },
    {
      uuid: 'bundle-9',
      name: 'Total knee replacement',
      price: '$17,000-$55,000*',
      items: [
        'Starting at $709 per month for 24 months* (*promotional period)',
        'The price only covers fees for physicians and physician assistants',
        'The price does not include facility fees, anesthesiologist fees, implant costs, or in procedure radiology',
      ],
    },
    {
      uuid: 'bundle-10',
      name: 'Bioknee',
      price: '$17,000-$55,000*',
      items: [
        'Starting at $709 per month for 24 months* (*promotional period)',
        'The price only covers fees for physicians and physician assistants',
        'The price does not include facility fees, anesthesiologist fees, implant costs, or in procedure radiology',
      ],
    },
  ],

  // about
  education: [
    {
      school: 'Harvard University',
      major: 'AB, Biology',
      startYear: '1973',
      endYear: '1977',
    },
    {
      school: 'University of North Carolina at Chapel Hill',
      major: 'MD, Medical Doctor',
      startYear: '1977',
      endYear: '1981',
    },
    {
      school: 'Harvard Beth Israel Hospital',
      major: 'Internship in Internal Medicine, Internal Medicine Residency Program',
      startYear: '1981',
      endYear: '1982',
    },
    {
      school: 'Stanford University School of Medicine',
      major: 'General Surgery Residency, General Surgery Residency Program',
      startYear: '1982',
      endYear: '1983',
    },
    {
      school: 'Harvard University Combined Orthopaedic Residency',
      major: 'Orthopaedic Surgery, Orthopedic Surgery Residency Program',
      startYear: '1983',
      endYear: '1986',
    },
    {
      school: 'Hospital for Special Surgery',
      major: 'Visiting Orthopaedic Fellow, Orthopaedic Research',
      startYear: '1986',
      endYear: '1986',
    },
    {
      school: 'Tahoe Orthopaedics',
      major: 'Fellow in Orthopaedic Surgery and Sports Medicine under Richard Steadman MD, Orthopaedic Surgery and Sports Medicine',
      startYear: '1986',
      endYear: '1987',
    },
  ],
  hospital_affiliates: [
    'California Pacific Medical Center, San Francisco, CA',
  ],
  languages: [
    'English', 'Spanish', 'French',
  ],
  board_certifications: [
    {
      title: 'American Board of Orthopaedic Surgery',
      description: 'Certified in Orthopaedic Surgery',
    },
    {
      title: 'CA State Medical License',
      description: 'Active through 2018',
    },
  ],
  memberships: [
    {
      title: 'American Academy of Orthopedic Surgeons',
      description: 'AAOS, Member',
      link: 'http://www.aaos.org',
    },
  ],

  media_publications: [
    {
      title: 'Articular cartilage paste graft for severe osteochondral lesions of the knee: a 10- to 23-year follow-up study.',
      link: 'https://www.ncbi.nlm.nih.gov/pubmed/27695904',
      description: 'Stone, K. R.,Pelsis, J. R.,Na, K.,Walgenbach, A. W.,Turek, T. J.; Knee Surg Sports Traumatol Arthrosc. 2016 Oct 04.',
    },
    {
      title: 'Osteochondral grafting for failed knee osteochondritis dissecans repairs.',
      link: 'https://www.ncbi.nlm.nih.gov/pubmed/25440187',
      description: 'Stone, K. R.,Pelsis, J. R.,Crues, J. V.,Walgenbach, A. W.,Turek, T. J.; Knee. 2014 Dec 03.',
    },
    {
      title: 'Meniscus transplantation in an active population with moderate to severe cartilage damage.',
      link: 'https://www.ncbi.nlm.nih.gov/pubmed/25253235',
      description: 'Stone, K. R.,Pelsis, J. R.,Surrette, S. T.,Walgenbach, A. W.,Turek, T. J.; Knee Surg Sports Traumatol Arthrosc. 2014 Sep 26.',
    },
    {
      title: 'Meniscal allografting: the three-tunnel technique.',
      link: 'https://www.ncbi.nlm.nih.gov/pubmed/12671626',
      description: 'Stone, K.R., Walgenbach, A.W.; Arthroscopy. 2003 Apr.',
    },
    {
      title: 'Long-term survival of concurrent meniscus allograft transplantation and repair of the articular cartilage: a prospective two- to 12-year follow-up report.',
      link: 'https://www.ncbi.nlm.nih.gov/pubmed/20595111',
      description: 'Stone, K. R.,Adelson, W. S.,Pelsis, J. R.,Walgenbach, A. W.,Turek, T. J.; J Bone Joint Surg Br. 2010 Jul 03.',
    },
    {
      title: 'Response to randomized trial of arthroscopic surgery.',
      link: 'https://www.ncbi.nlm.nih.gov/pubmed/18971066',
      description: 'Stone, K. R.; Arthroscopy. 2008 Nov.',
    },
    {
      title: 'Meniscal sizing based on gender, height, and weight.',
      link: 'https://www.ncbi.nlm.nih.gov/pubmed/17478281',
      description: 'Stone, K. R., Freyer, A., Turek, T., Walgenbach, A. W., Wadhwa, S., Crues, J.; Arthroscopy. 2007 May.',
    },
    {
      title: 'Anterior cruciate ligament reconstruction with a porcine xenograft: a serologic, histologic, and biomechanical study in primates.',
      link: 'https://www.ncbi.nlm.nih.gov/pubmed/17418335',
      description: 'Stone, K. R., Walgenbach, A. W., Turek, T. J., Somers, D. L., Wicomb, W., Galili, U.; Arthroscopy. 2007 Apr.',
    },
    {
      title: 'Replacement of human anterior cruciate ligaments with pig ligaments: a model for anti-non-gal antibody response in long-term xenotransplantation.',
      link: 'https://www.ncbi.nlm.nih.gov/pubmed/17264818',
      description: 'Stone, K. R., Abdel-Motal, U. M., Walgenbach, A. W., Turek, T. J., Galili, U.; Transplantation. 2007 Jan 27.',
    },
    {
      title: 'Meniscus allograft survival in patients with moderate to severe unicompartmental arthritis: a 2- to 7-year follow-up.',
      link: 'https://www.ncbi.nlm.nih.gov/pubmed/16651154',
      description: 'Stone, K. R., Walgenbach, A. W., Turek, T. J., Freyer, A., Hill, M. D.; Arthroscopy. 2006 May.',
    },
    {
      title: 'Articular cartilage paste grafting to full-thickness articular cartilage knee joint lesions: a 2- to 12-year follow-up.',
      link: 'https://www.ncbi.nlm.nih.gov/pubmed/16517314',
      description: 'Stone, K.R., Walgenbach, A.W., Freyer, A., Turek, T.J., Speer, D.P.; Arthroscopy. 2006 Mar.',
    },
  ],

  // articles
  articles: [
    {
      title: 'LeBron James v Stephen Curry',
      description: 'You watch the ball. I watch the knees. Here is what I see:',
      url: 'http://www.stoneclinic.com/blog/LeBron-James-v-Stephen-Curry',
      imgSrc: 'http://www.stoneclinic.com/sites/default/files/styles/750x500/public/blog/lebron-steph.jpg?itok=AGppcpM4',
      author: 'Kevin R. Stone, M.D',
      date: 'June 10th, 2018',
    },
    {
      title: 'How to Run Without Pain',
      description: 'Pain and running: Do they have to go together? Not for everybody. Here, in a nutshell, are my 10 best tips for diminishing pain while running:',
      url: 'http://www.stoneclinic.com/blog/Run-Without-Pain',
      imgSrc: 'http://www.stoneclinic.com/sites/default/files/styles/750x500/public/blog/how_to_run_without_pain.jpg?itok=GRSCcBmd',
      author: 'Kevin R. Stone, M.D',
      date: 'June 3rd, 2018',
    },
    {
      title: 'Stand Up',
      description: 'Stand up straight, like your mother told you to. Bad posture is a cause of multiple musculoskeletal problems. Here is what you can do.',
      url: 'http://www.stoneclinic.com/blog/Stand-Up',
      imgSrc: 'http://www.stoneclinic.com/sites/default/files/styles/750x500/public/blog/stand_up.jpg?itok=JGSlv1Ur',
      author: 'Kevin R. Stone, M.D',
      date: 'May 27th, 2018',
    },
  ],

  // images
  images: [
    {
      title: 'Dr. Stone next to Golden Gate Bridge',
      src: 'https://kangaroo-health-directory.imgix.net/Dr.+Stone+next+to+the+Golden+Gate+Bridge.jpg',
    },
    {
      title: 'In Clinic Consultation',
      src: 'https://kangaroo-health-directory.imgix.net/In+clinic+Consultation.jpg',
    },
    {
      title: 'Patient Exam Room',
      src: 'https://kangaroo-health-directory.imgix.net/Patient+Exam+Room.jpg',
    },
    {
      title: 'Phone Consultation with Dr. Stone',
      src: 'https://kangaroo-health-directory.imgix.net/Phone+Consultation+with+Dr.+Stone.jpg',
    },
    {
      title: 'Physical Therapy Training',
      src: 'https://kangaroo-health-directory.imgix.net/Physical+Therapy+Training.jpg',
    },
    {
      title: 'Physical Training',
      src: 'https://kangaroo-health-directory.imgix.net/Physical+Therapy.jpg',
    },
    {
      title: 'See a Patient',
      src: 'https://kangaroo-health-directory.imgix.net/See+a+patient.jpg',
    },
    {
      title: 'Surgery Assistant and Nurse Practitioner',
      src: 'https://kangaroo-health-directory.imgix.net/Surgery+Assistant+and+Nurse+Practitioner.jpg',
    },
    {
      title: 'TED Talk',
      src: 'https://kangaroo-health-directory.imgix.net/TED+Talk.jpg',
    },
    {
      title: 'The Stone Clinic Care Team',
      src: 'https://kangaroo-health-directory.imgix.net/The+Stone+Clinic+Care+Team.jpg',
    },
    {
      title: 'The Stone Clinic',
      src: 'https://kangaroo-health-directory.imgix.net/The+Stone+Clinic.jpg',
    },
  ],

  // videos
  videos: [
    {
      title: 'The Recovery of Super bowl Champion Tracy Porter',
      src: 'https://kangaroo-health-directory.imgix.net/videos/Featured-+The+Recovery+of+Super+Bowl+Champion+Tracy+Porter.mp4',
      thumb: 'https://kangaroo-health-directory.imgix.net/videos/thumbs/tn10.png',
      featured: 1,
    },
    {
      title: 'Artificial Knee Replacement - Patient Experience',
      src: 'https://kangaroo-health-directory.imgix.net/videos/Artificial+Knee+Replacement+-+Patient+Experience.mp4',
      thumb: 'https://kangaroo-health-directory.imgix.net/videos/thumbs/tn1.png',
    },
    {
      title: 'Biologic Repare for ACL Injury for a World Class Ballet Dancer',
      src: 'https://kangaroo-health-directory.imgix.net/videos/Biologic+Repair+for+ACL+Injury+for+a+World+Class+Ballet+Dancer.mp4',
      thumb: 'https://kangaroo-health-directory.imgix.net/videos/thumbs/tn2.png',
    },
    {
      title: 'Knee replacement - An athelete\'s choice',
      src: 'https://kangaroo-health-directory.imgix.net/videos/Knee+replacement-+An+athlete_s+choice.mp4',
      thumb: 'https://kangaroo-health-directory.imgix.net/videos/thumbs/tn3.png',
    },
    {
      title: 'Lateral MAKOplasty partial knee replacement',
      src: 'https://kangaroo-health-directory.imgix.net/videos/Lateral+MAKOplasty+partial+knee+replacement.mp4',
      thumb: 'https://kangaroo-health-directory.imgix.net/videos/thumbs/tn4.png',
    },
    {
      title: 'Medical MAKOplasty partial knee replacement',
      src: 'https://kangaroo-health-directory.imgix.net/videos/Medial+MAKOplasty+partial+knee+replacement.mp4',
      thumb: 'https://kangaroo-health-directory.imgix.net/videos/thumbs/tn5.png',
    },
    {
      title: 'Patient Story - Meniscus Transplant Revision - 3 months post op',
      src: 'https://kangaroo-health-directory.imgix.net/videos/Patient+story+-+Meniscus+Transplant+Revision+-+3+months+post+op.mp4',
      thumb: 'https://kangaroo-health-directory.imgix.net/videos/thumbs/tn6.png',
    },
    {
      title: 'Rotator Cuff Repair - Patient Experience',
      src: 'https://kangaroo-health-directory.imgix.net/videos/Rotator+Cuff+Repair+-+Patient+Experience.mp4',
      thumb: 'https://kangaroo-health-directory.imgix.net/videos/thumbs/tn7.png',
    },
    {
      title: 'Surgical and stem cell treatment of patella arthritis',
      src: 'https://kangaroo-health-directory.imgix.net/videos/Surgical+and+stem+cell+treatment+of+patella+arthritis.mp4',
      thumb: 'https://kangaroo-health-directory.imgix.net/videos/thumbs/tn8.png',
    },
    {
      title: 'The history of the Stone clinic',
      src: 'https://kangaroo-health-directory.imgix.net/videos/The+history+of+the+Stone+clinic.mp4',
      thumb: 'https://kangaroo-health-directory.imgix.net/videos/thumbs/tn9.png',
    },
    {
      title: 'The recovery of pro-skier',
      src: 'https://kangaroo-health-directory.imgix.net/videos/The+recovery+of+pro-skier.mp4',
      thumb: 'https://kangaroo-health-directory.imgix.net/videos/thumbs/tn10.png',
    },
    {
      title: 'TED Talk Kevin Stone The bio-future of joint replacement',
      src: 'https://kangaroo-health-directory.imgix.net/videos/0.+TED+Talk+Kevin+Stone+The+bio-future+of+joint+replacement.mp4',
      thumb: 'https://kangaroo-health-directory.imgix.net/videos/thumbs/0.+TED+Talk.jpg',
    },
    {
      title: 'Articular Cartilage Paste Graft Technique Interview with Dr. Kevin Stone',
      src: 'https://kangaroo-health-directory.imgix.net/videos/Articular+Cartilage+Paste+Graft+Technique+Interview+with+Dr.+Kevin+Stone.mp4',
      thumb: 'https://kangaroo-health-directory.imgix.net/videos/thumbs/Phone+Consultation+with+Dr.+Stone.jpg',
    },
    {
      title: 'Biologic Joint Replacement Meniscus Transplantation',
      src: 'https://kangaroo-health-directory.imgix.net/videos/Biologic+Joint+Replacement+Meniscus+Transplantation.mp4',
      thumb: 'https://kangaroo-health-directory.imgix.net/videos/thumbs/Dr.+Stone+next+to+the+Golden+Gate+Bridge.jpg',
    },
    {
      title: 'MAKOplasty Robotic Knee Surgery',
      src: 'https://kangaroo-health-directory.imgix.net/videos/MAKOplasty+Robotic+Knee+Surgery.mp4',
      thumb: 'https://kangaroo-health-directory.imgix.net/videos/thumbs/In+clinic+Consultation.jpg',
    },
    {
      title: 'What is the Biologic Knee Replacement Program',
      src: 'https://kangaroo-health-directory.imgix.net/videos/What+is+the+Biologic+Knee+Replacement+Program.mp4',
      thumb: 'https://kangaroo-health-directory.imgix.net/videos/thumbs/Physical+Therapy+Training.jpg',
    },
  ],
};
