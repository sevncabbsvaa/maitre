
export function Header() {
  return (
    <header className="border-b border-(--line) bg-(--bg)">
      <div className="flex h-17.75 items-center justify-between px-(--page-gutter) max-[720px]:h-15">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-semibold tracking-[-0.02em]">
            Maitre
          </span>

          <span className="rounded-full bg-(--text) px-2.5 py-1 font-(--font-label) text-xs uppercase tracking-[0.06em] text-white">
            Admin
          </span>
        </div>

        <div className="flex items-center gap-2.5 text-[15px] text-(--text-muted)">
          <span className="max-[720px]:hidden">
            Sevinc Abbasova
          </span>

          <span className="grid size-9 place-items-center rounded-full bg-(--chip-bg) text-sm font-semibold text-(--primary)">
            SA
          </span>
        </div>
      </div>
    </header>
  )
}
