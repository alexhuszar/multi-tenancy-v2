'use client';

import { useState } from 'react';
import * as z from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@multi-tenancy/design-system';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@multi-tenancy/design-system';
import { Button } from '../../components/Button';
import { CreateFolderSchema } from './folder.schemas';

type CreateFolderValues = z.infer<typeof CreateFolderSchema>;

interface CreateFolderFormProps {
  accountId: string;
}

export const CreateFolderForm = ({ accountId }: CreateFolderFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<CreateFolderValues>({
    resolver: zodResolver(CreateFolderSchema),
    defaultValues: {
      name: '',
      accountId,
    },
  });

  const onSubmit: SubmitHandler<CreateFolderValues> = async (values) => {
    setLoading(true);
    setError('');

    try {
      const data = values as CreateFolderValues;

      console.log('Creating folder with name:', data.name);

      // Implement folder creation logic here, e.g., call an API to create the folder
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form-container">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="form-input">
              <FormControl>
                <Input {...field} label="Folder name" />
              </FormControl>
              <FormMessage className="form-message" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={loading}
          variant="primary"
          className="mt-4 w-full"
        >
          Create
        </Button>
        {error && (
          <p className="form-message" role="alert" aria-live="assertive">
            {error}
          </p>
        )}
      </form>
    </Form>
  );
};
