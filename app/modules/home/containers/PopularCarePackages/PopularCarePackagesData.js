import ImgConsultation from 'images/package_doctor-consultation.jpg';
import ImgKnee from 'images/package_man-bracing-knee.jpg';
import ImgHip from 'images/package_hip-free-move.jpg';
import ImgFootball from 'images/package_footballer-hurt.jpg';
import ImgMassage from 'images/package_massage-shoulder.jpg';
import ImgRunStart from 'images/package_run-start-line.jpg';


export default [
  {
    userlink: '/packages',
    userimage: ImgConsultation,
    rating: '4',
    caption: 'Identify Diagnosis',
    price: '$168',
    title: 'Orthopedic Consultation',
    about:
      'Experienced and caring physicians diagnose you based on your medical history, current conditions, and examination data.',
  },
  {
    userlink: '/packages/knee',
    userimage: ImgKnee,
    rating: '4',
    caption: 'Find New Mobility',
    price: '$15000',
    title: 'Total Knee Replacement',
    about:
      'This is a surgical procedure that fully replaces the weight-bearing surfaces of a knee joint to relieve pain and disability. It is frequently performed for osteoarthritis and other knee disease, such as rheumatoid arthritis and psoriatic arthritis.',
  },
  {
    userlink: '/packages/hip',
    userimage: ImgHip,
    rating: '4',
    caption: 'Regain Functions',
    price: '$15000',
    title: 'Total Hip Replacement',
    about:
      'Hip replacement is a surgical procedure in which the hip joint is replaced by a prosthetic implant. It is generally conducted to relieve arthritis pain or in some hip fractures. More than 300,000 total hip replacement surgeries are performed each year in US with high success rates.',
  },
  {
    userlink: '/packages/fitness',
    userimage: ImgFootball,
    rating: '4',
    caption: 'Regain Fitness',
    price: '$16800',
    title: 'ACL Reconstruction',
    about:
      'This procedure is done to repair a partially or completely torn anterior cruciate ligament (ACL). An arthroscopy is a minimally invasive procedure where surgeons operate through small holes with the help of a special camera and surgical tools. This improves recovery speed due to reduced trauma to the knee.',
  },
  {
    userlink: '/packages/massage',
    userimage: ImgMassage,
    rating: '4',
    caption: 'Embrace Freedom',
    price: '$16800',
    title: 'Rotator Cuff Repair',
    about:
      'This is a common procedure with high success rates to repair a torn rotator cuff. It most often involves re-attaching the tendon to the head of upper arm bone (humerus). A partial tear may need only a trimming or smoothing procedure, while a complete tear is repaired by stitching the tendon back to its original site on the upper arm bone.',
  },
  {
    userlink: '/packages/renew',
    userimage: ImgRunStart,
    rating: '4',
    caption: 'Renew Exploration',
    price: '16800',
    title: 'Meniscus Repair',
    about:
      'This is a very common outpatient procedure. It is done to repair torn knee cartilage using a variety of minimally invasive techniques. It is a highly effective procedure with good results in over 90% of patients. A successful meniscus repair preserves meniscus tissue and mitigates degenerative processes in the knee.',
  },
];
