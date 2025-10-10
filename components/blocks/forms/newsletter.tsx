'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import SectionContainer from '@/components/ui/section-container';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { stegaClean } from 'next-sanity';
import { cn } from '@/lib/utils';
import { PAGE_QUERYResult } from '@/sanity.types';

type FormNewsletterProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number],
  { _type: 'form-newsletter' }
>;

export default function FormNewsletter({
  padding,
  colorVariant,
  sectionWidth = 'default',
  stackAlign = 'left',
  tagLine,
  title,
  description,
  consentText,
  buttonText,
  successMessage,
}: FormNewsletterProps) {
  const isNarrow = stegaClean(sectionWidth) === 'narrow';
  const align = stegaClean(stackAlign);
  const color = stegaClean(colorVariant);

  // form validation schema
  const formSchema = z.object({
    email: z
      .string()
      .min(1, {
        message: 'Please enter your email',
      })
      .email({
        message: 'Please enter a valid email',
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const { isSubmitting } = form.formState;

  const handleSend = useCallback(
    async ({ email }: { email: string }) => {
      try {
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          toast(successMessage);
          form.reset();
        } else {
          toast.error(result.error);
        }
      } catch (error: any) {
        toast.error(error.message);
        throw new Error(error.message);
      }
    },
    [form, successMessage]
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await handleSend(values);
  }

  return (
    <SectionContainer color={color} padding={padding}>
      <div
        className={cn(
          'space-y-8',
          isNarrow ? 'max-w-[48rem] mx-auto' : undefined
        )}
      >
        {(title || tagLine || description) && (
          <div
            className={cn(
              align === 'center'
                ? 'max-w-[48rem] text-center mx-auto'
                : undefined
            )}
          >
            <div
              className={cn(
                color === 'primary' ? 'text-background' : undefined
              )}
            >
              {tagLine && (
                <h1 className="leading-[0] mb-4">
                  <span className="text-base font-semibold">{tagLine}</span>
                </h1>
              )}
              {title && <h2 className="text-3xl md:text-5xl mb-4">{title}</h2>}
            </div>
            {description && <p>{description}</p>}
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="off"
                        // ignore 1 Password autofill
                        data-1p-ignore
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="h-9"
                size="sm"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                )}
                {buttonText}
              </Button>
            </div>
            {consentText && <p className="mt-4 text-xs">{consentText}</p>}
          </form>
        </Form>
      </div>
    </SectionContainer>
  );
}
