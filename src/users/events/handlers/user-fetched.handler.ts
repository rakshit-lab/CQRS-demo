import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserFetchedEvent } from '../impl/user-fetched.event';

@EventsHandler(UserFetchedEvent)
export class UserFetchedHandler implements IEventHandler<UserFetchedEvent> {
  handle(event: UserFetchedEvent) {
    console.log('UserFetchedEvent received:', event);
  }
}