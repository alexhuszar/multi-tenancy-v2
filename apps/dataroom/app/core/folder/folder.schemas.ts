import * as z from 'zod';

export const CreateFolderSchema = z.object({
  name: z
    .string()
    .min(2, {
      error: (iss) =>
        (iss.input as string) === ''
          ? 'Field is required.'
          : `Name must have ${iss.minimum} characters or more`,
    })
    .max(50, { error: 'Too long!' }),
  accountId: z.string('Is required!'),
});
