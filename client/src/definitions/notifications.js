export const SUBJECTS = {
  CLIENT: 'client',
  PROVIDER: 'provider',
};

export const EVENTS = {
  LOADING: 'loading',
  CREATING: 'creating',
  UPDATING: 'updating',
  DELETING: 'deleting',
  CREATED: 'created',
  UPDATED: 'updated',
  DELETED: 'deleted',
};

const subjectTypeCheck = (subject) => {
  if (!Object.values(SUBJECTS).some((s) => s === subject)) {
    throw new Error(`Not found this "${subject}" subject's type!`);
  }

  return true;
};

const eventTypeCheck = (event) => {
  if (!Object.values(EVENTS).some((e) => e === event)) {
    throw new Error(`Not found this "${event}" event's type!`);
  }

  return true;
};

export const getSuccessText = (subject, event, title) => {
  subjectTypeCheck(subject);
  eventTypeCheck(event);

  return `The ${subject} ${title} was successfully ${event}!`;
};

export const getErrorText = (subject, event, title) => {
  subjectTypeCheck(subject);
  eventTypeCheck(event);

  return `An error occurred while ${event} the ${subject} ${title}!`;
};
