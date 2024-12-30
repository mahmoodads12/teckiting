import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from '@matickets12/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
