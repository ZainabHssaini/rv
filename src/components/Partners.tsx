    import { useEffect, useRef, useState } from 'react';

    interface Partner {
    id: number;
    name: string;
    logo: string;
    }

    const Partners = () => {
    const partners: Partner[] = [
        {
        id: 1,
        name: 'Association Ahlam Assafir',
        logo: 'image/Ahlam Elassafir.png'
        },
        {
        id: 2,
        name: 'Association Nationale du Développement Digital',
        logo: 'image/ANDD LOGO.png'
        },
        {
        id: 3,
        name: 'Espacce al akhawayne pour les enfants autistes',
        logo: 'image/AL AKHAWAYN LOGO.png'
        },
        {
        id: 4,
        name: 'Ecole privé château d\'enfant',
        logo: 'image/Ecole Logo.png'
        },
        {
        id: 5,
        name: 'Fédératrion nationale de la santé mentale',
        logo: 'image/FNSM LOGO.png'
        },
        {
        id: 6,
        name: 'Fédératrion nationale de la santé mentale',
        logo: 'image/1000041446.png'
        },
        {
        id: 7,
        name: 'Fédératrion nationale de la santé mentale',
        logo: 'image/associationChamss LOGO.png'
        },
        {
        id: 8,
        name: 'Fédératrion nationale de la santé mentale',
        logo: 'image/LaboLogo.jpeg'
        },
        {
        id: 9,
        name: 'Fédératrion nationale de la santé mentale',
        logo: 'image/psy2ALogo.png'
        }
    ];

    // Dupliquer les logos pour un effet infini
    const duplicatedLogos = [...partners, ...partners, ...partners];
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const speed = 1;

    useEffect(() => {
        let animationId: number;
        
        const animate = () => {
        setScrollPosition(prev => {
            // Réinitialiser la position pour boucler
            if (containerRef.current && prev >= containerRef.current.scrollWidth / 3) {
            return 0;
            }
            return prev + speed;
        });
        animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <section className="py-12 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Our Partners
            </h2>
            
            <div className="relative">
            {/* Conteneur du carrousel */}
            <div 
                ref={containerRef}
                className="overflow-hidden"
            >
                <div 
                className="flex w-max items-center"
                style={{ transform: `translateX(-${scrollPosition}px)` }}
                >
                {duplicatedLogos.map((partner, index) => (
                    <div 
                    key={`${partner.id}-${index}`}
                    className="mx-8 flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity"
                    >
                    <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="h-24 object-contain max-w-[240px]"
                        loading="lazy"
                    />
                    </div>
                ))}
                </div>
            </div>

            {/* Dégradés sur les côtés */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
            </div>
        </div>
        </section>
    );
    };

    export default Partners;