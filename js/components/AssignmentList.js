import Assignment from './Assignment.js';
import AssignmentTags from './AssignmentTags.js'
import Panel from './Panel.js';

export default {
    components: { Assignment, AssignmentTags, Panel },
    template: `
    <Panel v-show="assignments.length" class="w-90">
        <div class="flex justify-between items-start">
            <h2 class="font-bold mb-2">
                {{ title }}
                 <span>({{ assignments.length }})</span>
             </h2>

             <button v-show="canToggle" @click="$emit('toggle')">&times;</button>
        </div>

            <assignment-tags
                v-model:currentTag="currentTag"
                :initial-tags="assignments.map(a => a.tag)"
            />

            <ul class="border border-gray-600 divide-y divide-gray-600 mt-6">
                <assignment
                    v-for="assignment in filteredAssignments"
                    :key="assignment.id"
                    :assignment="assignment"
                ></assignment>
            </ul>

            <slot></slot>
    </Panel>
    `,

    props: {
        assignments: Array,
        title: String,
        canToggle: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            currentTag: 'all',
        }
    },

    computed: {
        filteredAssignments() {
            if (this.currentTag === 'all') {
                return this.assignments;
            }
            return this.assignments.filter(a => a.tag === this.currentTag);
        },
        tags() {
            return ['all', ...new Set(this.assignments.map(a => a.tag))];
        }
    }
}