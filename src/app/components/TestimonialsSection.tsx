import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const testimonials = [
{
  name: 'Nkemdirim Eze',
  role: 'IT Manager, Douala',
  company: 'Afriland First Bank',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_129b7caed-1763301866732.png",
  avatarAlt: 'Professional African man in business attire smiling confidently',
  rating: 5,
  quote: "Ordered 40 laptops for our Douala branch through the B2B account. Delivered in 2 days, all genuine, with proper invoicing. ElectroMart is our go-to supplier now.",
  verified: true
},
{
  name: 'Aminatou Diallo',
  role: 'Content Creator, Yaoundé',
  company: 'Self-employed',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_151d5cedf-1768562812874.png",
  avatarAlt: 'Young African woman with natural hair smiling warmly outdoors',
  rating: 5,
  quote: "The Sony headphones I bought are 100% authentic and arrived faster than expected. The product page had every spec I needed. Will be buying my new camera here.",
  verified: true
},
{
  name: 'Jean-Baptiste Mvondo',
  role: 'University Student, Bafoussam',
  company: 'Université de Dschang',
  avatar: "https://images.unsplash.com/photo-1709104560513-f57443110c8e",
  avatarAlt: 'Young man with glasses smiling in casual setting',
  rating: 4,
  quote: "Got a MacBook Pro at a price I couldn't find anywhere else in Cameroon. The installment plan option made it possible for a student. Excellent customer service.",
  verified: true
}];


function StarRating({ rating }: {rating: number;}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) =>
      <Icon
        key={star}
        name="StarIcon"
        variant={star <= rating ? 'solid' : 'outline'}
        size={14}
        className={star <= rating ? 'star-filled' : 'star-empty'} />

      )}
    </div>);

}

export default function TestimonialsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-600 uppercase tracking-widest text-primary mb-2">
              Social Proof
            </p>
            <h2 className="text-section-xl text-foreground">
              Trusted by Cameroonians
            </h2>
          </div>
          {/* Aggregate rating */}
          <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-5 py-3">
            <div>
              <div className="font-mono-price text-2xl text-foreground">4.8</div>
              <StarRating rating={5} />
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="text-sm font-600 text-foreground">Excellent</div>
              <div className="text-xs text-muted-foreground">Based on 1,240 reviews</div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) =>
          <div
            key={t.name}
            className="card-border rounded-xl p-6 flex flex-col gap-4 hover-lift"
            style={{ transitionDelay: `${i * 60}ms` }}>
            
              {/* Stars */}
              <StarRating rating={t.rating} />

              {/* Quote */}
              <blockquote className="text-sm text-foreground/85 leading-relaxed italic flex-1">
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-border shrink-0">
                  <AppImage
                  src={t.avatar}
                  alt={t.avatarAlt}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover" />
                
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-600 text-foreground truncate">{t.name}</span>
                    {t.verified &&
                  <Icon name="CheckBadgeIcon" size={14} className="text-primary shrink-0" variant="solid" />
                  }
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{t.role}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}