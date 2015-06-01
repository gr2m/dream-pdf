module.exports = toLength

function toLength (block) {
  return block.lines.join('\n').length + 1
}
