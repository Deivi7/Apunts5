import { createModule } from '../createModule.js'

export default createModule({
  sections: [
    { id: 'calendar', title: 'Calendario escolar', desc: 'Google Calendar' },
  ],
  theoryHtml: '',
  resources: [
    {
      title: 'Abrir en Google Calendar',
      url: 'https://calendar.google.com/calendar/u/1?cid=ZGRjZTc3ZmM4NjgwODMwMzA2ZjE3YmM0YjgwM2FiMjUzYjkxYzFkNjZmYmFmNjMwN2Y3NDc4NjhkMWUzMTI3ZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t',
    },
  ],
  documents: [],
  exercisesBySection: {},
  calendarEmbed:
    'https://calendar.google.com/calendar/embed?src=ddce77fc8680830306f17bc4b803ab253b91c1d66fbaf6307f747868d1e3127d%40group.calendar.google.com&ctz=Europe%2FMadrid&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0&mode=MONTH',
})
