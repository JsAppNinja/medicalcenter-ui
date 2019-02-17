import { travelSelector } from '../selectors';

export default function getQA(state) {
  return {
    travels: [
      {
        title: 'International Travel',
        icon: 'plane',
        description: travelSelector(state, 'internationalTravel'),
      },
      {
        title: 'Local Travel',
        icon: 'bus',
        description: travelSelector(state, 'localTravel'),
      },
      {
        title: 'Local Accommodation',
        icon: 'accomodation',
        description: travelSelector(state, 'localAccomodation'),
      },
      {
        title: 'Translation Services',
        icon: 'translate',
        description: travelSelector(state, 'translationServices'),
      },
      {
        title: 'Local Guide',
        icon: 'hike',
        description: travelSelector(state, 'localGuide'),
      },
      {
        title: 'Tours and Vacation Services',
        icon: 'vacation',
        description: travelSelector(state, 'tourVacation'),
      },
      {
        title: 'Pick Up Service from Hotel',
        icon: 'pickup',
        description: travelSelector(state, 'pickupHotel'),
      },
      {
        title: 'Pick Up Service from Airport',
        icon: 'hotel',
        description: travelSelector(state, 'pickupAirport'),
      },
    ],
  };
}
