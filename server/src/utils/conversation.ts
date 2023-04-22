import sanitizeHtml from 'sanitize-html';
import {Message} from 'src/types/conversation.type';
export const parseConversationMessages = (messages: Message[]): Message[] => {
  const options = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['svg']),
    allowedClasses: {
      div: [
        'bg-black',
        'mb-4',
        'rounded-md',
        'flex',
        'items-center',
        'relative',
        'text-gray-200',
        'bg-gray-800',
        'px-4',
        'py-2',
        'text-xs',
        'font-sans',
        'flex',
        'ml-auto',
        'gap-2',
      ],
    },
    allowedAttributes: Object.assign({}, sanitizeHtml.defaults.allowedAttributes, {
      div: ['class'],
      span: ['class'],
      button: ['class', 'type', 'aria-label', 'aria-hidden', 'title'],
      code: ['class'],
      svg: [
        'class',
        'viewBox',
        'xmlns',
        'fill',
        'width',
        'height',
        'x',
        'y',
        'd',
        'stroke-linecap',
        'stroke-linejoin',
        'stroke-width',
        'stroke',
        'fill-rule',
        'clip-rule',
        'stroke-miterlimit',
        'stroke-dasharray',
        'stroke-dashoffset',
        'stroke-opacity',
        'fill-opacity',
        'transform',
        'preserveAspectRatio',
      ],
    }),
    allowedSchemes: ['http', 'https', 'mailto', 'tel', 'data'],
  };
  const _messages: Message[] = messages.map(message => {
    return {
      ...message,
      value: sanitizeHtml(message.value, options),
    };
  });
  return _messages;
};
