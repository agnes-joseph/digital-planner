import { ArrowLeft, Plus, DotsThree } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { formatSeconds, formatDate } from '@/store/usePlanner'
import type { View, PlannerStore } from '../types'

export default function ProjectsView({
  navigate,
  planner,
}: {
  navigate: (v: View) => void
  planner: PlannerStore
}) {
  const { projects, tasks, addProject, addTask, updateTask, deleteProject, getProjectTotalSeconds, getProjectLastWorked } = planner

  function handleAddProject() {
    const name = prompt('Project name')
    if (name?.trim()) addProject(name.trim())
  }

  function handleAddTask(projectId: string) {
    const name = prompt('Task name')
    if (name?.trim()) addTask(projectId, name.trim())
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('dashboard')}
            className="rounded-full"
          >
            <ArrowLeft size={12} />
            Dashboard
          </Button>
          <Button size="sm" className="rounded-full" onClick={handleAddProject}>
            <Plus size={12} weight="bold" />
            Add project
          </Button>
        </div>

        <h1 className="text-2xl font-bold mb-6">Projects</h1>

        {projects.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-12">
            No projects yet. Add one to get started.
          </p>
        )}

        <div className="space-y-3">
          {projects.map(p => {
            const projectTasks = tasks.filter(t => t.projectId === p.id)
            const totalSeconds = getProjectTotalSeconds(p.id)
            const lastWorked = getProjectLastWorked(p.id)

            return (
              <Card key={p.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: p.color }}
                      />
                      <div>
                        <h2 className="font-medium">{p.name}</h2>
                        <div className="flex items-center gap-3 mt-1">
                          {totalSeconds > 0 && (
                            <span className="text-xs text-muted-foreground">
                              {formatSeconds(totalSeconds)} logged
                            </span>
                          )}
                          {lastWorked && (
                            <span className="text-xs text-muted-foreground">
                              Last worked {formatDate(lastWorked)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      className="rounded-lg"
                      onClick={() => {
                        if (confirm(`Delete "${p.name}"?`)) deleteProject(p.id)
                      }}
                    >
                      <DotsThree size={14} weight="bold" />
                    </Button>
                  </div>

                  <div className="space-y-1.5">
                    {projectTasks.map(task => (
                      <div
                        key={task.id}
                        className="flex items-center gap-2.5 px-2.5 py-2 border border-border rounded-xl"
                      >
                        <Checkbox
                          checked={task.done}
                          onCheckedChange={(checked) =>
                            updateTask(task.id, { done: Boolean(checked) })
                          }
                          className="shrink-0"
                        />
                        <span className={cn('text-sm', task.done && 'line-through text-muted-foreground')}>
                          {task.name}
                        </span>
                      </div>
                    ))}

                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start px-2.5 text-muted-foreground"
                      onClick={() => handleAddTask(p.id)}
                    >
                      <Plus size={12} />
                      Add task
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
