import { useMemo } from 'react';
import { Book } from '@/types/book';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ReadingHeatmapProps {
  books: Book[];
}

const ReadingHeatmap = ({ books }: ReadingHeatmapProps) => {
  const heatmapData = useMemo(() => {
    const year = new Date().getFullYear();
    const startDate = new Date(year, 0, 1);
    const today = new Date();
    const days: Record<string, number> = {};

    // Count pages read per day from reading sessions
    books.forEach(book => {
      book.readingSessions?.forEach(session => {
        const date = session.date;
        days[date] = (days[date] ?? 0) + session.pagesRead;
      });
    });

    const result: { date: string; pages: number; dayOfWeek: number; week: number }[] = [];
    const current = new Date(startDate);
    while (current <= today) {
      const dateStr = current.toISOString().split('T')[0];
      const dayOfWeek = current.getDay();
      const weekStart = new Date(year, 0, 1);
      const diff = Math.floor((current.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24));
      const week = Math.floor(diff / 7);
      result.push({
        date: dateStr,
        pages: days[dateStr] ?? 0,
        dayOfWeek,
        week,
      });
      current.setDate(current.getDate() + 1);
    }

    return result;
  }, [books]);

  const maxPages = Math.max(...heatmapData.map(d => d.pages), 1);
  const weeks = Math.max(...heatmapData.map(d => d.week)) + 1;

  const getIntensity = (pages: number) => {
    if (pages === 0) return 'bg-muted/50';
    const ratio = pages / maxPages;
    if (ratio < 0.25) return 'bg-primary/25';
    if (ratio < 0.5) return 'bg-primary/50';
    if (ratio < 0.75) return 'bg-primary/75';
    return 'bg-primary';
  };

  const monthLabels = useMemo(() => {
    const labels: { label: string; week: number }[] = [];
    for (let m = 0; m < 12; m++) {
      const d = new Date(new Date().getFullYear(), m, 1);
      if (d > new Date()) break;
      const weekStart = new Date(new Date().getFullYear(), 0, 1);
      const diff = Math.floor((d.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24));
      labels.push({
        label: d.toLocaleDateString('pt-BR', { month: 'short' }),
        week: Math.floor(diff / 7),
      });
    }
    return labels;
  }, []);

  return (
    <div className="rounded-lg ornamental-border bg-card p-5 animate-fade-in paper-texture">
      <h3 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-widest">
        Mapa de Leituras {new Date().getFullYear()}
      </h3>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Month labels */}
          <div className="flex mb-1 ml-8">
            {monthLabels.map((m, i) => (
              <span
                key={i}
                className="text-[10px] text-muted-foreground"
                style={{ position: 'relative', left: `${(m.week / weeks) * 100}%` }}
              >
                {m.label}
              </span>
            ))}
          </div>
          <div className="flex gap-[2px]">
            {/* Day labels */}
            <div className="flex flex-col gap-[2px] mr-1">
              {['', 'Seg', '', 'Qua', '', 'Sex', ''].map((d, i) => (
                <span key={i} className="text-[9px] text-muted-foreground h-[11px] leading-[11px]">{d}</span>
              ))}
            </div>
            {/* Grid */}
            {Array.from({ length: weeks }, (_, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-[2px]">
                {Array.from({ length: 7 }, (_, dayIdx) => {
                  const cell = heatmapData.find(d => d.week === weekIdx && d.dayOfWeek === dayIdx);
                  if (!cell) return <div key={dayIdx} className="w-[11px] h-[11px]" />;
                  return (
                    <Tooltip key={dayIdx}>
                      <TooltipTrigger asChild>
                        <div className={`w-[11px] h-[11px] rounded-[2px] ${getIntensity(cell.pages)} transition-colors cursor-default`} />
                      </TooltipTrigger>
                      <TooltipContent className="text-xs">
                        <p className="font-medium">{new Date(cell.date).toLocaleDateString('pt-BR')}</p>
                        <p>{cell.pages} páginas lidas</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            ))}
          </div>
          {/* Legend */}
          <div className="flex items-center gap-1.5 mt-3 justify-end">
            <span className="text-[10px] text-muted-foreground">Menos</span>
            <div className="w-[11px] h-[11px] rounded-[2px] bg-muted/50" />
            <div className="w-[11px] h-[11px] rounded-[2px] bg-primary/25" />
            <div className="w-[11px] h-[11px] rounded-[2px] bg-primary/50" />
            <div className="w-[11px] h-[11px] rounded-[2px] bg-primary/75" />
            <div className="w-[11px] h-[11px] rounded-[2px] bg-primary" />
            <span className="text-[10px] text-muted-foreground">Mais</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingHeatmap;
