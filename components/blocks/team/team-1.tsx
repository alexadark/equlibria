import { PAGE_QUERYResult } from '@/sanity.types';
import { stegaClean } from 'next-sanity';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SectionContainer from '@/components/ui/section-container';
import { urlFor } from '@/sanity/lib/image';
import { getSocialIcon } from '@/lib/social-icons';

type Block = NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number];
type Team1 = Extract<Block, { _type: 'team-1' }>;

export default function Team1({
  padding,
  colorVariant,
  sectionWidth = 'default',
  stackAlign = 'left',
  tagLine,
  title,
  description,
  members,
}: Team1) {
  const isNarrow = stegaClean(sectionWidth) === 'narrow';
  const align = stegaClean(stackAlign);
  const color = stegaClean(colorVariant);

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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {members &&
            members.length > 0 &&
            members.map((member) => (
              <div key={member._key} className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <Avatar className="size-20 lg:size-24">
                      {member.avatar && member.avatar.asset?._id && (
                        <AvatarImage
                          src={urlFor(member.avatar).url()}
                          alt={member.avatar.alt || member.name || ''}
                          className="object-cover"
                        />
                      )}
                      <AvatarFallback className="text-lg font-semibold">
                        {member.name}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-1 text-lg font-semibold">
                      {member.name}
                    </h3>
                    {member.role && (
                      <p className="text-primary text-sm font-medium">
                        {member.role}
                      </p>
                    )}
                  </div>

                  {member.socialLinks && member.socialLinks.length > 0 && (
                    <div className="flex gap-3">
                      {member.socialLinks.map((link) => {
                        if (!link?.platform || !link?.url) return null;
                        const platform = stegaClean(link.platform);
                        const Icon = getSocialIcon(platform);
                        return (
                          <a
                            key={link._key}
                            href={link.url}
                            className="bg-muted/50 rounded-lg p-2 hover:bg-muted transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={platform}
                          >
                            <Icon className="text-muted-foreground size-4" />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </SectionContainer>
  );
}
